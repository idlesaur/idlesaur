'use server';

import { auth } from '@/auth';
import { getBoneDiggerCost } from '@/util';
import { prisma } from '@/prisma';
import { getAndUpdateBones } from '@/app/lib/actions';
import { BuyBoneDiggerState } from '@/app/lib/types';

export async function buyBoneDiggers(
    _previousState: BuyBoneDiggerState | null,
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
        await getAndUpdateBones();

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
