import { cache } from 'react';
import { prisma } from '@/prisma';

export const getPostBySlug = cache(async (slug: string) => {
    return prisma.post.findUnique({
        where: { slug },
    });
});
