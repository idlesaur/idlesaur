import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/prisma';
import { getFullUserData } from '@/app/lib/data';

export const { handlers, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [GitHub, Google],
    callbacks: {
        async session({ session, user }) {
            if (!user?.id) return session;

            const dbUser = await getFullUserData(user.id);

            if (dbUser) {
                session.user = {
                    ...session.user,
                    id: dbUser.id,
                    profile: dbUser.profile,
                    currency: dbUser.currency,
                    upgrades: dbUser.upgrades,
                };
            }

            return session;
        },
    },
    events: {
        createUser: async ({ user }) => {
            await prisma.$transaction([
                prisma.profile.create({
                    data: {
                        userId: user.id!,
                        bio: '',
                    },
                }),
                prisma.currency.create({
                    data: {
                        userId: user.id!,
                        bones: 0,
                    },
                }),
                prisma.upgrades.create({
                    data: {
                        userId: user.id!,
                        boneDiggers: 0,
                    },
                }),
            ]);
        },
    },
});
