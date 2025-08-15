import { PrismaClient, Prisma } from '@/generated/prisma';

const prisma = new PrismaClient();

const postData: Prisma.PostCreateInput[] = [
    {
        title: 'Welcome to Idlesaur!',
        content:
            'Welcome to the future place of an online idle game.  More to come soon!',
        published: true,
    },
];

export async function main() {
    for (const post of postData) {
        await prisma.post.create({ data: post });
    }
}

main();
