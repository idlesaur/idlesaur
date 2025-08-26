import type { Metadata } from 'next';
import './globals.css';
import React, { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { Josefin_Sans } from 'next/font/google';

import { Footer } from '@/components';

const mainFont = Josefin_Sans({
    subsets: ['latin'],
    // display: 'swap',
});

export const metadata: Metadata = {
    title: 'Idlesaur',
    description:
        'Free-to-play Open-source Multi-player Online Idle Dinosaur Game.',
};

const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <html lang="en">
            <body
                className={`flex min-h-screen flex-col ${mainFont.className}`}
            >
                <div className="flex flex-1 flex-col items-center justify-center">
                    <SessionProvider>{children}</SessionProvider>
                </div>
                <Footer />
            </body>
        </html>
    );
};

export default RootLayout;
