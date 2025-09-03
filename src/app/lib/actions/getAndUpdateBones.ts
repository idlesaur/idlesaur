'use server';

import { auth } from '@/auth';
import { getFullUserData } from '@/app/lib/data';
import { getBonesPerSecond } from '@/util';
import { prisma } from '@/prisma';

export async function getAndUpdateBones() {
    const session = await auth();
    if (!session?.user?.id) return null;

    const user = await getFullUserData(session.user.id);

    if (!user?.currency || !user?.upgrades) return null;

    const now = new Date();
    const secondsPassed = Math.floor(
        (now.getTime() - user.currency.lastBonesTick.getTime()) / 1000,
    );

    let bones = user.currency.bones;
    if (secondsPassed > 0) {
        bones += secondsPassed * getBonesPerSecond(user.upgrades.boneDiggers);
    }

    return prisma.currency.update({
        where: { userId: user.id },
        data: {
            bones,
            lastBonesTick: now,
        },
    });
}
