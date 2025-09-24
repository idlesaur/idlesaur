'use server';

import { auth } from '@/auth';
import { prisma } from '@/prisma';
import { RenameDinoState } from '@/app/lib/types';
import { RenameDinosaur } from '@/schema';
import { flattenZodError } from '@/app/lib/util';
import { revalidatePath } from 'next/cache';
import { Routes } from '@/constants';

export async function renameDino(
    _previousState: RenameDinoState | null,
    formData: FormData,
): Promise<RenameDinoState> {
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

    const nameData = {
        id: formData.get('id'),
        name: formData.get('name'),
    };

    const parsedName = RenameDinosaur.safeParse(nameData);
    if (!parsedName.success) {
        return {
            success: false,
            message: 'Dinosaur rename parse error',
            errors: flattenZodError(parsedName.error),
        };
    }

    try {
        const dino = await prisma.dinosaur.update({
            data: { name: parsedName.data.name },
            where: { id: parsedName.data.id, userId },
        });

        revalidatePath(Routes.GAME);

        return {
            dino,
            success: true,
            message: 'Dinosaur renamed successfully.',
        };
    } catch (e: unknown) {
        console.error(e);

        return {
            success: false,
            message: 'Dinosaur rename update error',
        };
    }
}
