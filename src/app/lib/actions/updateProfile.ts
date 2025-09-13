'use server';

import { Profile, ProfileType } from '@/schema';
import { auth } from '@/auth';
import {
    flattenZodError,
    mergeZodErrors,
    toZodErrorMany,
} from '@/app/lib/util';
import { prisma } from '@/prisma';
import { revalidatePath } from 'next/cache';
import { Routes } from '@/constants';
import { BaseServerActionResponse, ServerErrors } from '@/app/lib/types';

export const updateProfile = async (
    _prevState: BaseServerActionResponse<ProfileType>,
    formData: FormData,
): Promise<BaseServerActionResponse<ProfileType>> => {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
        return { success: false, message: 'Unauthorized' };
    }

    if (!(formData instanceof FormData)) {
        return {
            success: false,
            message: 'Invalid Form Data',
        };
    }

    const profileFormData = Object.fromEntries(formData);
    const profile = {
        ...profileFormData,
        public: profileFormData.public === 'true',
    };

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
        const prismaError: ServerErrors<ProfileType> = {};

        if (
            typeof e === 'object' &&
            e !== null &&
            'code' in e &&
            e.code === 'P2002'
        ) {
            // @ts-expect-error meta might exist
            const target = e?.meta?.target?.[0]?.replace('"', '') || false;
            if (target === 'userName') {
                prismaError.userName = `Username "${parsedProfile.data.userName}" already exists`;
            }
        }

        const prismaZodError = toZodErrorMany(prismaError);

        return {
            success: false,
            message: 'Validation error',
            errors: flattenZodError(
                mergeZodErrors(parsedProfile.error, prismaZodError),
            ),
        };
    }
};
