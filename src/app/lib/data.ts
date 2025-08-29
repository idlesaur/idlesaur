import { cache } from 'react';

import { prisma } from '@/prisma';

export const getPostBySlug = cache(async (slug: string) => {
    const res = await prisma.post.findUnique({
        where: { slug },
    });
    return res;
});
