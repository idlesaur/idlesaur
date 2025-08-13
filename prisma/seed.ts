import { PrismaClient, Prisma } from '@/generated/prisma';

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
    {
        name: 'Idlesaur',
        email: 'idlesaurgame@gmail.com',
        posts: {
            create: [
                {
                    title: 'Welcome to Idlesaur!',
                    content:
                        'Welcome to the future place of an online idle game.  More to come soon!',
                    published: true,
                    createdAt: new Date(1755100047238),
                },
            ],
        },
    },
];

export async function main() {
    for (const u of userData) {
        await prisma.user.create({ data: u });
    }
}

main();
