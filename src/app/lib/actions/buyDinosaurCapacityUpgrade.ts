'use server';

import { auth } from '@/auth';
import { getDinoCapacityIncreaseCost } from '@/util';
import { prisma } from '@/prisma';
import { getAndUpdateBones } from '@/app/lib/actions';
import { BuyDinosaurCapacityUpgradeState } from '@/app/lib/types';

export async function buyDinosaurCapacityUpgrade(
    _previousState: BuyDinosaurCapacityUpgradeState | null,
    _formData: FormData,
): Promise<BuyDinosaurCapacityUpgradeState> {
    console.log('buyDinosaurCapacityUpgrade start');
    const session = await auth();
    if (!session?.user?.id) {
        return { success: false, message: 'Unauthorized' };
    }

    try {
        await getAndUpdateBones();

        return await prisma.$transaction(async (tx) => {
            const result = await tx.upgrades.findUnique({
                where: { userId: session.user.id },
            });
            const cost = getDinoCapacityIncreaseCost(
                result?.dinosaurCapacity ?? 0,
            );

            const currency = await tx.currency.update({
                data: {
                    bones: { decrement: cost },
                },
                where: { userId: session.user.id },
            });

            if (currency.bones < 0) {
                throw new Error(`Not enough bones to purchase bone digger`);
            }

            const upgrades = await tx.upgrades.update({
                data: { dinosaurCapacity: { increment: 1 } },
                where: { userId: session?.user?.id },
            });

            return {
                success: true,
                bones: currency.bones,
                dinosaurCapacity: upgrades.dinosaurCapacity,
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
