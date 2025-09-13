import React, { InputHTMLAttributes, ReactNode } from 'react';
import { getButtonClass } from '@/components/ui/util';
import { LoadingIndicator } from '@/components';

export type ButtonVariant = 'primary' | 'secondary';

export interface ButtonProps extends InputHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
    disabled?: boolean;
    variant?: ButtonVariant;
    onClick?: () => void;
    className?: string;
    loading?: boolean;
    type?: 'button' | 'submit' | 'reset' | undefined;
}

export const Button = ({
    children,
    disabled = false,
    variant = 'primary',
    onClick,
    className,
    type = 'button',
    loading = false,
    ...rest
}: ButtonProps) => {
    return (
        <button
            disabled={disabled || loading}
            className={getButtonClass(variant, className)}
            onClick={onClick}
            type={type}
            {...rest}
        >
            {loading ? <LoadingIndicator /> : children}
        </button>
    );
};
