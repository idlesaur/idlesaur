import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/prisma';

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [GitHub, Google],
    callbacks: {
        async session({ session, user }) {
            // Merge custom DB fields into the session
            if (session.user) {
                session.user.id = user.id;
                // session.user.role = (user as any).role;
                // session.user.theme = (user as any).theme;
            }
            return session;
        },
    },
});
