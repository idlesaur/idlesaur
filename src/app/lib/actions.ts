'use server';

import { auth } from '@/auth';
import { prisma } from '@/prisma';
import { Prisma } from '@/generated/prisma';
import { revalidatePath } from 'next/cache';
import { Routes } from '@/constants';
import {
    getBoneDiggerCost,
    getBonesPerSecond,
    mergeZodErrors,
    toZodErrorMany,
} from '@/util';
import { getFullUserData } from '@/app/lib/data';
import { Profile, ProfileType } from '@/schema';
import * as z from 'zod';

export interface BaseServerActionResponse<T> {
    success: boolean;
    message?: string;
    errors?: z.core.$ZodError<T>;
}

export interface DigState extends BaseServerActionResponse<undefined> {
    bones?: number;
}

export async function dig(): Promise<DigState> {
    const session = await auth();

    if (!session?.user?.id) {
        return { success: false, message: 'Unauthorized' };
    }

    try {
        return await prisma.$transaction(async () => {
            await getAndUpdateBones();

            // Random bones gained per dig (1-5)
            const bonesGained = Math.floor(Math.random() * 5) + 1;

            const updatedCurrency = await prisma.currency.update({
                where: { userId: session?.user?.id },
                data: { bones: { increment: bonesGained } },
            });

            revalidatePath(Routes.GAME);

            return {
                success: true,
                bones: updatedCurrency.bones,
            };
        });
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Server error' };
    }
}

export interface BuyBoneDiggerState
    extends BaseServerActionResponse<undefined> {
    bones?: number;
    boneDiggers?: number;
}

export async function buyBoneDiggers(
    _currentState: BuyBoneDiggerState | null,
    formData: FormData,
): Promise<BuyBoneDiggerState> {
    const session = await auth();
    if (!session?.user?.id) {
        return { success: false, message: 'Unauthorized' };
    }

    const currentDiggers = session.user.upgrades?.boneDiggers ?? 0;
    const quantity = Number(formData.get('amountBoneDiggersToBuy')) ?? 1;
    const cost = getBoneDiggerCost(currentDiggers, quantity);

    try {
        return await prisma.$transaction(async (tx) => {
            await getAndUpdateBones();

            const currency = await tx.currency.update({
                data: {
                    bones: { decrement: cost },
                },
                where: { userId: session?.user?.id },
            });

            if (currency.bones < 0) {
                throw new Error(`Not enough bones to purchase bone digger`);
            }

            const upgrades = await tx.upgrades.update({
                data: { boneDiggers: { increment: quantity } },
                where: { userId: session?.user?.id },
            });

            return {
                success: true,
                boneDiggers: upgrades.boneDiggers,
                bones: currency.bones,
            };
        });
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: String(error),
        };
    }
}

export async function getAndUpdateBones() {
    const session = await auth();
    if (!session?.user?.id) return null;

    const user = await getFullUserData(session.user.id);

    if (!user?.currency || !user?.upgrades) return null;

    const now = new Date();
    const secondsPassed = Math.floor(
        (now.getTime() - user.currency.lastBonesTick.getTime()) / 1000,
    );

    let bones = user.currency.bones;
    if (secondsPassed > 0) {
        bones += secondsPassed * getBonesPerSecond(user.upgrades.boneDiggers);
    }

    return prisma.currency.update({
        where: { userId: user.id },
        data: {
            bones,
            lastBonesTick: now,
        },
    });
}

export const updateProfile = async (
    profile: ProfileType,
): Promise<BaseServerActionResponse<ProfileType>> => {
    const session = await auth();
    if (!session?.user?.id) {
        return { success: false, message: 'Unauthorized' };
    }

    const user = await getFullUserData(session.user.id);

    if (!user?.profile) {
        return { success: false, message: 'Profile not found' };
    }

    const parsedProfile = Profile.safeParse(profile);

    if (!parsedProfile.success) {
        return {
            success: false,
            message: 'Profile parse error',
            errors: parsedProfile.error,
        };
    }

    try {
        await prisma.profile.update({
            data: parsedProfile.data,
            where: { userId: session?.user?.id },
        });

        revalidatePath(Routes.PROFILE);
        return { success: true, message: 'Updated profile successfully.' };
    } catch (e) {
        if (
            e instanceof Prisma.PrismaClientKnownRequestError &&
            e.code === 'P2002'
        ) {
            return {
                success: false,
                message: 'Validation error',
                errors: mergeZodErrors(
                    undefined, // could be parsedProfile.error if it failed
                    toZodErrorMany<ProfileType>({
                        userName: 'Username already taken',
                    }),
                ),
            };
        }

        throw e;
    }

    return { success: false, message: 'Updated profile failed successfully.' };
};
