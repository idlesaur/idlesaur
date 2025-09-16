import React, { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export interface CardProps {
    children?: ReactNode;
    className?: string;
}

export const Card = ({ children, className }: CardProps) => {
    return (
        <div
            className={twMerge(
                'bg-background-900 flex flex-auto flex-col items-center justify-center gap-3 rounded-2xl p-3',
                className,
            )}
        >
            {children}
        </div>
    );
};
