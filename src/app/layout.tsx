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
});

export const metadata: Metadata = {
    title: 'Idlesaur',
    description:
        'Free-to-play Open-source Multi-player Online Idle Dinosaur Game.',
};

export const experimental_ppr = true;

export default async function Layout({ children }: { children: ReactNode }) {
    const session = await auth();

    return (
        <html lang="en">
            <body
                className={`flex min-h-screen flex-col ${mainFont.className}`}
            >
                <SessionProvider>
                    <Header />
                    <div className="flex flex-1 flex-col items-center justify-center">
                        {children}
                    </div>
                </SessionProvider>
                <Footer />
            </body>
        </html>
    );
}
