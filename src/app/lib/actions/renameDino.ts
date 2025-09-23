'use server';

import { auth } from '@/auth';
import { prisma } from '@/prisma';
import { RenameDinoState } from '@/app/lib/types';

export async function renameDino(
    _previousState: RenameDinoState | null,
    _formData: FormData,
): Promise<RenameDinoState> {
    const name = _formData.get('newName') as string;
    console.log('renameDino start ', name);

    const session = await auth();
    if (!session?.user?.id) {
        return { success: false, message: 'Unauthorized' };
    }
    return {
        success: true,
        // dino,
    };
    // try {
    //     return await prisma.$transaction(async (tx) => {
    //         // const dino = await tx.dinosaur.update({
    //         //     data: createDino({
    //         //         user: { connect: { id: session.user.id } },
    //         //     }),
    //         // });
    //
    //         return {
    //             success: true,
    //             // dino,
    //         };
    //     });
    // } catch (error) {
    //     console.error(error);
    //     return {
    //         success: false,
    //         message: String(error),
    //     };
    // }
}
