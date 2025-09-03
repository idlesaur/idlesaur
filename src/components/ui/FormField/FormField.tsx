import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { camelCaseToWords } from '@/util';
import { getInputClass } from '@/components/ui/util';

export interface FormFieldProps<T extends FieldValues> {
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
}: FormFieldProps<T>) => {
    return (
        <>
            <label>{camelCaseToWords(label)}</label>
            <input
                {...register(label, { required })}
                className={getInputClass()}
                aria-invalid={!!error}
            />
            {error && <span className="text-red-600">{error}</span>}
        </>
    );
};
