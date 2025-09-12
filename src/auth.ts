import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/prisma';
import { getUserData, updateProfileLastActive } from '@/app/lib/data';

export const { handlers, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [GitHub, Google],
    callbacks: {
        async session({ session, user }) {
            if (!user?.id) return session;

            const dbUser = await getUserData({ userId: user.id });

            if (dbUser) {
                session.user = {
                    ...session.user,
                    id: dbUser.id,
                };
            }

            return session;
        },
    },
    events: {
        session: async ({ session }) => {
            await updateProfileLastActive({ userId: session?.user?.id });
        },
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
