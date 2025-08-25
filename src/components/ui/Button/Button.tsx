import React, { ReactNode } from 'react';
import { getButtonClass } from '@/components/ui/util';

export type ButtonVariant = 'primary' | 'secondary';

export interface ButtonProps {
    children?: ReactNode;
    disabled?: boolean;
    variant?: ButtonVariant;
    onClick?: () => void;
    className?: string;
    type?: 'button' | 'submit' | 'reset' | undefined;
}

export const Button = ({
    children,
    disabled = false,
    variant = 'primary',
    onClick,
    className,
    type = 'button',
}: ButtonProps) => {
    return (
        <button
            disabled={disabled}
            className={getButtonClass(variant, className)}
            onClick={onClick}
            type={type}
        >
            {children}
        </button>
    );
};
