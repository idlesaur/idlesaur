'use server';

import { Profile, ProfileType } from '@/schema';
import { auth } from '@/auth';
import { getFullUserData } from '@/app/lib/data';
import {
    flattenZodError,
    mergeZodErrors,
    toZodErrorMany,
} from '@/app/lib/util';
import { prisma } from '@/prisma';
import { revalidatePath } from 'next/cache';
import { Routes } from '@/constants';
import { BaseServerActionResponse } from '@/app/lib/types';

export const updateProfile = async (
    _prevState: BaseServerActionResponse<ProfileType>,
    formData: FormData,
): Promise<BaseServerActionResponse<ProfileType>> => {
    const session = await auth();
    if (!session?.user?.id) {
        return { success: false, message: 'Unauthorized' };
    }

    if (!(formData instanceof FormData)) {
        return {
            success: false,
            message: 'Invalid Form Data',
        };
    }

    const user = await getFullUserData(session.user.id);
    if (!user?.profile) {
        return { success: false, message: 'Profile not found' };
    }

    const profile = Object.fromEntries(formData);
    const parsedProfile = Profile.safeParse(profile);
    if (!parsedProfile.success) {
        return {
            success: false,
            message: 'Profile parse error',
            errors: flattenZodError(parsedProfile.error),
        };
    }

    try {
        await prisma.profile.update({
            data: parsedProfile.data,
            where: { userId: session?.user?.id },
        });

        revalidatePath(Routes.PROFILE);
        return { success: true, message: 'Updated profile successfully.' };
    } catch (e: unknown) {
        // Prepare Prisma-style errors
        const prismaError: Partial<ProfileType> = {};

        if (
            typeof e === 'object' &&
            e !== null &&
            'code' in e &&
            e.code === 'P2002'
        ) {
            // @ts-expect-error meta might exist
            const target = e?.meta?.target?.[0]?.replace('"', '') || 'userName';
            prismaError[target as keyof ProfileType] =
                `Username "${profile.userName}" already exists`;
        }

        const prismaZodError = toZodErrorMany<ProfileType>(prismaError);

        return {
            success: false,
            message: 'Validation error',
            errors: flattenZodError(
                mergeZodErrors(parsedProfile.error, prismaZodError),
            ),
        };
    }
};
