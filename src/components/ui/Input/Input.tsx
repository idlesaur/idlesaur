import React, { InputHTMLAttributes } from 'react';
import { getInputClass } from '@/components/ui/util';

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ className, type = 'text', ...rest }: InputProps) => {
    return <input {...rest} type={type} className={getInputClass(className)} />;
};
