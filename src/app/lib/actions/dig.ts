'use server';

import { auth } from '@/auth';
import { prisma } from '@/prisma';
import { getAndUpdateBones } from '@/app/lib/actions';
import { BaseServerActionResponse } from '@/app/lib/types';
import { revalidatePath } from 'next/cache';
import { Routes } from '@/constants';

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
