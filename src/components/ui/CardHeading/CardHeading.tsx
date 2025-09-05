import React, { ReactNode } from 'react';
import { Heading } from '@/components/ui';

export interface CardHeadingProps {
    children?: ReactNode;
}

export const CardHeading = ({ children }: CardHeadingProps) => {
    return (
        <Heading level={3} className="w-full text-center">
            {children}
        </Heading>
    );
};
