import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { camelCaseToWords } from '@/util';
import { Input, InputProps } from '@/components/ui';
import { twMerge } from 'tailwind-merge';

export interface FormSliderProps<T extends FieldValues> extends InputProps {
    label: Path<T>;
    register: UseFormRegister<T>;
    allowEdit?: boolean;
    required?: boolean;
    error?: string;
    className?: string;
}

export const FormSlider = <T extends FieldValues>({
    allowEdit,
    className,
    error,
    label,
    register,
    min = 0,
    max = 100,
    step = 1,
    required = false,
    ...rest
}: FormSliderProps<T>) => {
    return (
        <div
            className={twMerge('flex w-full flex-col items-center', className)}
        >
            <Input
                type="range"
                min={min}
                max={max}
                step={step}
                className={twMerge(
                    `accent-primary-700 h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-300`,
                )}
                {...register(label, { required })}
                aria-invalid={!!error}
                {...rest}
            />
            <div className="mt-3 flex items-center justify-center text-sm"></div>
        </div>
    );
};
