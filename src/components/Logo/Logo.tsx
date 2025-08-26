import { Rubik_Wet_Paint } from 'next/font/google';
import { Heading } from '@/components/ui';
import React from 'react';

const logoFont = Rubik_Wet_Paint({
    subsets: ['latin'],
    display: 'swap',
    weight: '400',
});

export interface LogoProps {
    level?: 1 | 2 | 3 | 4;
}

export const Logo = ({ level }: LogoProps) => {
    return (
        <Heading className={`${logoFont.className}`} level={level}>
            Idlesaur
        </Heading>
    );
};
