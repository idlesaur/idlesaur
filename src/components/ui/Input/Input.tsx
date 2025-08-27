import React, { InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ className, type = 'text', ...rest }: InputProps) => {
    const mergedClass = twMerge('bg-background-800', className);
    return <input {...rest} type={type} className={mergedClass} />;
};
