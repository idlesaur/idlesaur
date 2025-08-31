import { FieldError, UseFormRegister } from 'react-hook-form';
import { InputHTMLAttributes } from 'react';

export type ValidFieldNames =
    | 'email'
    | 'githubUrl'
    | 'yearsOfExperience'
    | 'password'
    | 'confirmPassword';

export interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    name: ValidFieldNames;
    register: UseFormRegister<FormData>;
    error: FieldError | undefined;
    valueAsNumber?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
    type,
    placeholder,
    name,
    register,
    error,
    valueAsNumber,
}) => (
    <>
        <input
            type={type}
            placeholder={placeholder}
            {...register(name, { valueAsNumber })}
        />
        {error && <span className="text-red-600">{error.message}</span>}
    </>
);
