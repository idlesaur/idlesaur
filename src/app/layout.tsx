import type { Metadata } from 'next';
import './globals.css';
import { ReactNode } from 'react';
import { auth } from '@/auth';
import { SessionProvider } from 'next-auth/react';

export const metadata: Metadata = {
    title: 'Idlesaur',
    description: 'Idle Dinosaur Game.',
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
    const session = await auth();

    return (
        <html lang="en">
            <body>
                <SessionProvider session={session}>{children}</SessionProvider>
            </body>
        </html>
    );
};

export default RootLayout;
