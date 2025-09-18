import type { Metadata } from 'next';
import './globals.css';
import React, { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { Josefin_Sans } from 'next/font/google';

import { Footer, Header, ToastNotificationContainer } from '@/components';
import { ToastsStoreProvider } from '@/state/providers';

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
    return (
        <html lang="en">
            <body
                className={`flex min-h-screen flex-col ${mainFont.className}`}
            >
                <ToastsStoreProvider>
                    <SessionProvider>
                        <Header />
                        <div className="flex flex-1 flex-col items-center justify-center">
                            {children}
                        </div>
                    </SessionProvider>
                    <ToastNotificationContainer />
                </ToastsStoreProvider>
                <Footer />
            </body>
        </html>
    );
}
