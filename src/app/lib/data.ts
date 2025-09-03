import { cache } from 'react';

import { prisma } from '@/prisma';

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

export const getFullUserData = async (userId: string) => {
    return prisma.user.findUnique({
        where: { id: userId },
        include: {
            profile: true,
            currency: true,
            upgrades: true,
        },
    });
};
