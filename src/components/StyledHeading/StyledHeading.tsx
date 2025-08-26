import { Black_Han_Sans } from 'next/font/google';
import { Heading } from '@/components/ui';
import React from 'react';

const logoFont = Black_Han_Sans({
    subsets: ['latin'],
    display: 'swap',
    weight: '400',
});

export interface StyledHeadingProps {
    children: React.ReactNode;
    level?: 1 | 2 | 3 | 4;
}

export const StyledHeading = ({ children, level }: StyledHeadingProps) => {
    return (
        <Heading className={logoFont.className} level={level}>
            {children}
        </Heading>
    );
};
