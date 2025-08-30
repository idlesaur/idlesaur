import { cache } from 'react';

import { prisma } from '@/prisma';

export const getPostBySlug = cache(async (slug: string) => {
    return await prisma.post.findUnique({
        where: { slug },
    });
});

export const getProfileByUserId = async (userId: string) => {
    return await prisma.profile.findUnique({
        where: { userId },
    });
};
