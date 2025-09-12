'use server';

import { auth } from '@/auth';
import { getDinoCost } from '@/util';
import { prisma } from '@/prisma';
import { getAndUpdateBones } from '@/app/lib/actions';
import { BuyDinoState } from '@/app/lib/types';
import { createDino } from '@/app/lib/util';

export async function buyDino(
    _previousState: BuyDinoState | null,
    _formData: FormData,
): Promise<BuyDinoState> {
    const session = await auth();
    if (!session?.user?.id) {
        return { success: false, message: 'Unauthorized' };
    }

    const cost = getDinoCost(1); // TODO: Fetch actual dino count

    try {
        await getAndUpdateBones();

        return await prisma.$transaction(async (tx) => {
            const currency = await tx.currency.update({
                data: {
                    bones: { decrement: cost },
                },
                where: { userId: session.user.id },
            });

            if (currency.bones < 0) {
                throw new Error(`Not enough bones to purchase bone digger`);
            }
            const dino = await tx.dinosaur.create({
                data: createDino({
                    user: { connect: { id: session.user.id } },
                }),
            });

            return {
                success: true,
                dino,
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
