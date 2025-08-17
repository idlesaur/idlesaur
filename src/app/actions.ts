'use server';

import { auth } from '@/auth';
import { prisma } from '@/prisma';
import { revalidatePath } from 'next/cache';
import { Routes } from '@/constants';
import { getBoneDiggerCost } from '@/util';

export async function dig() {
    const session = await auth();

    if (!session?.user?.id) {
        return { success: false, message: 'Unauthorized' };
    }

    try {
        // Random bones gained per dig (1-5)
        const bonesGained = Math.floor(Math.random() * 5) + 1;

        const updatedCurrency = await prisma.currency.update({
            where: { userId: session?.user?.id },
            data: { bones: { increment: bonesGained } },
        });

        revalidatePath(Routes.GAME);

        return {
            success: true,
            bonesGained,
            totalBones: updatedCurrency.bones,
        };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Server error' };
    }
}

export type BuyBoneDiggerState = {
    success: boolean;
    message?: string;
    error?: string;
    totalBones?: number;
    boneDiggers?: number;
};

export async function buyBoneDigger(): Promise<BuyBoneDiggerState> {
    const session = await auth();
    if (!session?.user?.id) {
        return { success: false, message: 'Unauthorized' };
    }

    const cost = getBoneDiggerCost(session.user.upgrades?.boneDiggers ?? 0);

    try {
        return await prisma.$transaction(async (tx) => {
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
                data: { boneDiggers: { increment: 1 } },
                where: { userId: session?.user?.id },
            });

            return {
                success: true,
                boneDiggers: upgrades.boneDiggers,
                totalBones: currency.bones,
            };
        });
    } catch (error: unknown) {
        return {
            success: false,
            error: String(error),
        };
    }
}
