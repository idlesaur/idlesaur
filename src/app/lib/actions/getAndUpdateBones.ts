'use server';

import { auth } from '@/auth';
import {
    getPlayerUpgrades,
    getUserCurrency,
    getUserData,
} from '@/app/lib/data';
import { getBonesPerSecond } from '@/util';
import { prisma } from '@/prisma';

export async function getAndUpdateBones() {
    const session = await auth();
    if (!session?.user?.id) return null;

    return prisma.$transaction(async (tx) => {
        const userId = session.user.id;

        const user = await getUserData({ userId, tx });

        if (!user) {
            return {
                success: false,
            };
        }

        const currency = await getUserCurrency({ userId, tx });
        if (!currency) {
            return {
                success: false,
            };
        }

        const now = new Date();
        const secondsPassed = Math.floor(
            (now.getTime() - currency.lastBonesTick.getTime()) / 1000,
        );

        const upgrades = await getPlayerUpgrades({ userId, tx });
        if (!upgrades) {
            return {
                success: false,
            };
        }
        const attemptedIncrease =
            secondsPassed > 0
                ? secondsPassed * getBonesPerSecond(upgrades.boneDiggers)
                : 0;
        const bones = currency.bones + attemptedIncrease;

        const r = await tx.currency.update({
            where: { userId: user.id },
            data: {
                bones,
                lastBonesTick: now,
            },
        });

        return {
            success: true,
            bones: r.bones,
        };
    });
}
