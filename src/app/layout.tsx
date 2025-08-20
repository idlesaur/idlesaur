import type { Metadata } from 'next';
import './globals.css';
import React, { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

export const metadata: Metadata = {
    title: 'Idlesaur',
    description: 'Idle Dinosaur Game.',
};

const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <html lang="en">
            <body>
                <div className="flex min-h-screen w-screen flex-col items-center justify-center">
                    <SessionProvider>{children}</SessionProvider>
                </div>
            </body>
        </html>
    );
};

export default RootLayout;
