'use server';

import { auth } from '@/auth';
import { getUserData } from '@/app/lib/data';
import { getBonesPerSecond } from '@/util';
import { prisma } from '@/prisma';

export async function getAndUpdateBones() {
    const session = await auth();
    if (!session?.user?.id) return null;

    return prisma.$transaction(async (tx) => {
        const user = await getUserData({ userId: session.user.id, tx });

        if (!user?.currency || !user?.upgrades) {
            return {
                success: false,
            };
        }

        const now = new Date();
        const secondsPassed = Math.floor(
            (now.getTime() - user.currency.lastBonesTick.getTime()) / 1000,
        );

        const attemptedIncrease =
            secondsPassed > 0
                ? secondsPassed * getBonesPerSecond(user.upgrades.boneDiggers)
                : 0;
        const bones = user.currency.bones + attemptedIncrease;

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
