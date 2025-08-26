import { PrismaClient, Prisma } from '@/generated/prisma';
import { generateSlug } from '@/util';

const prisma = new PrismaClient();

const postData: Partial<Prisma.PostCreateInput>[] = [
    {
        title: 'Idlesaur is Open Source!',
        content:
            'Check out the link in the footer and you even find this post in `prisma/seed.ts`',
        published: true,
    },
    {
        title: 'Super-early access',
        content:
            'The game is very early access and will most definitely incur some data wipes.  There will be more announcements here when the game is ready for a more "permanent" state.  Thanks!',
        published: true,
    },
    {
        title: 'Welcome to Idlesaur!',
        content:
            'Welcome to the future place of an online idle game.  More to come soon!',
        published: true,
    },
];

export async function main() {
    for (const post of postData) {
        await prisma.post.create({
            data: {
                ...post,
                slug: generateSlug(post.title!),
            } as Prisma.PostCreateInput,
        });
    }

    console.log(`Prisma seeded successfully.`);
}

main();
