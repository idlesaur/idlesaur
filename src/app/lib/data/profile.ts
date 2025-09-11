import { prisma } from '@/prisma';
import { HighScore } from '@/types';
import { getPublicProfileName } from '@/util';

export interface UpdateProfileLastActiveProps {
    userId: string;
}

export const updateProfileLastActive = async ({
    userId,
}: UpdateProfileLastActiveProps) => {
    await prisma.profile.update({
        data: {
            lastActive: new Date(),
        },
        where: {
            userId,
        },
    });
};

export const getProfileByUserId = async (userId: string) => {
    return prisma.profile.findUnique({
        where: { userId },
    });
};

export const getPublicProfileByUserName = async (
    userName: string,
    isOwnProfile?: boolean,
) => {
    return prisma.profile.findUnique({
        where: {
            userName,
            ...(!isOwnProfile && { public: true }),
        },
        include: {
            user: {
                select: {
                    currency: true,
                },
            },
        },
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
                            public: true,
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
        userName: getPublicProfileName(
            r.user?.profile?.userName,
            r.user?.profile?.public,
        ),
        publicProfile: r.user?.profile?.public ?? false,
        score: r.bones,
        rank: 1 + skip + i,
        key: r.user?.profile?.userId ?? String(i),
    }));

    return highScores;
};
