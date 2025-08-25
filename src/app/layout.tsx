import type { Metadata } from 'next';
import './globals.css';
import React, { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

import { Footer } from '@/components';

export const metadata: Metadata = {
    title: 'Idlesaur',
    description: 'Idle Dinosaur Game.',
};

const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <html lang="en">
            <body className="flex min-h-screen flex-col">
                <div className="flex flex-1 flex-col items-center justify-center">
                    <SessionProvider>{children}</SessionProvider>
                </div>
                <Footer />
            </body>
        </html>
    );
};

export default RootLayout;
