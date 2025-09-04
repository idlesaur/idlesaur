import { cache } from 'react';

import { prisma } from '@/prisma';
import { PrismaClient } from '@/generated/prisma';
import { HighScore } from '@/types';

export type PrismaTransactionalClient = Parameters<
    Parameters<PrismaClient['$transaction']>[0]
>[0];

export const getPostBySlug = cache(async (slug: string) => {
    return prisma.post.findUnique({
        where: { slug },
    });
});

export const getProfileByUserId = async (userId: string) => {
    return prisma.profile.findUnique({
        where: { userId },
    });
};

export interface GetHighScoresParams {
    skip?: number;
    take?: number;
}

export const getHighScores = async ({
    skip = 0,
    take = 10,
}: GetHighScoresParams = {}) => {
    const result = await prisma.currency.findMany({
        orderBy: [
            {
                bones: 'desc',
            },
        ],
        select: {
            bones: true,
            user: {
                select: {
                    profile: {
                        select: {
                            userName: true,
                            userId: true,
                        },
                    },
                },
            },
        },
        skip,
        take,
    });

    const highScores: HighScore[] = result.map((r, i) => ({
        userName: r.user?.profile?.userName ?? 'Anonnosaur',
        score: r.bones,
        rank: 1 + skip + i,
        key: r.user?.profile?.userId ?? String(i),
    }));

    return highScores;
};

export interface GetUserDataParams {
    userId: string;
    tx?: PrismaTransactionalClient;
}

export const getUserData = ({ userId, tx }: GetUserDataParams) => {
    const user = tx?.user ?? prisma.user;

    return user.findUnique({
        where: { id: userId },
        include: {
            profile: true,
            currency: true,
            upgrades: true,
        },
    });
};
