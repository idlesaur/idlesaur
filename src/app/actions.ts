'use server';

import { auth } from '@/auth';
import { prisma } from '@/prisma';
import { revalidatePath } from 'next/cache';
import { Routes } from '@/constants';

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
