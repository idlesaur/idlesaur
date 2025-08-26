import type { Metadata } from 'next';
import './globals.css';
import React, { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { Josefin_Sans } from 'next/font/google';

import { Footer, Header } from '@/components';
import { UserStateProvider } from '@/state/providers';
import { auth } from '@/auth';

const mainFont = Josefin_Sans({
    subsets: ['latin'],
    // display: 'swap',
});

export const metadata: Metadata = {
    title: 'Idlesaur',
    description:
        'Free-to-play Open-source Multi-player Online Idle Dinosaur Game.',
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
    const session = await auth();
    const userName = session?.user?.profile?.userName ?? undefined;
    const profileImage = session?.user?.image ?? undefined;

    return (
        <html lang="en">
            <body
                className={`flex min-h-screen flex-col ${mainFont.className}`}
            >
                <SessionProvider>
                    <UserStateProvider
                        initialState={{ userName, profileImage }}
                    >
                        <Header />
                        <div className="flex flex-1 flex-col items-center justify-center">
                            {children}
                        </div>
                    </UserStateProvider>
                </SessionProvider>
                <Footer />
            </body>
        </html>
    );
};

export default RootLayout;
