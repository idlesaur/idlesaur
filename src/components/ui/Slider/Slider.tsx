'use client';

import { InputHTMLAttributes, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { Input } from '@/components/ui';

export interface SliderProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    allowEdit?: boolean;
}

export const Slider = ({
    value: controlledValue,
    min = 0,
    max = 100,
    step = 1,
    onChange,
    className,
    name,
    allowEdit = false,
    ...rest
}: SliderProps) => {
    const [internalValue, setInternalValue] = useState(controlledValue ?? min);

    const isControlled = controlledValue !== undefined;
    const currentValue = isControlled ? controlledValue : internalValue;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(e.target.value);
        if (!isControlled) setInternalValue(newValue);
        onChange?.(e);
    };

    return (
        <div
            className={twMerge('flex w-full flex-col items-center', className)}
        >
            <Input
                type="range"
                min={min}
                max={max}
                step={step}
                value={currentValue}
                onChange={handleChange}
                name={name}
                className={twMerge(
                    `accent-primary-700 h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-300`,
                )}
                {...rest}
            />
            <div className="mt-3 flex items-center justify-center text-sm">
                {allowEdit ? (
                    <Input
                        min={min}
                        type="number"
                        value={currentValue}
                        onChange={handleChange}
                        className="text-center"
                    />
                ) : (
                    <span>{currentValue}</span>
                )}
            </div>
        </div>
    );
};
