import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { camelCaseToWords } from '@/util';
import { Input, InputProps } from '@/components/ui';

export interface FormFieldProps<T extends FieldValues> extends InputProps {
    label: Path<T>;
    register: UseFormRegister<T>;
    required?: boolean;
    error?: string;
}

export const FormField = <T extends FieldValues>({
    error,
    label,
    register,
    required = false,
    type,
    ...rest
}: FormFieldProps<T>) => {
    return (
        <>
            {type !== 'hidden' && <label>{camelCaseToWords(label)}</label>}
            <Input
                {...register(label, { required })}
                aria-invalid={!!error}
                aria-label={label}
                type={type}
                {...rest}
            />
            {error && <span className="text-red-600">{error}</span>}
        </>
    );
};
