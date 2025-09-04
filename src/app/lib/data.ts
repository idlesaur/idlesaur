import { cache } from 'react';

import { prisma } from '@/prisma';
import { PrismaClient } from '@/generated/prisma';

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
