import type { Metadata } from 'next';
import './globals.css';
import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

export const metadata: Metadata = {
    title: 'Idlesaur',
    description: 'Idle Dinosaur Game.',
};

const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <html lang="en">
            <body>
                <SessionProvider>{children}</SessionProvider>
            </body>
        </html>
    );
};

export default RootLayout;
