import { PrismaClient, Prisma } from '@/generated/prisma';
import { generateSlug } from '@/util';

const prisma = new PrismaClient();

const postData: Prisma.PostCreateInput[] = [
    {
        title: 'Welcome to Idlesaur!',
        content:
            'Welcome to the future place of an online idle game.  More to come soon!',
        published: true,
        slug: generateSlug('Welcome to Idlesaur!'),
    },
];

export async function main() {
    for (const post of postData) {
        await prisma.post.create({ data: post });
    }
}

main();
