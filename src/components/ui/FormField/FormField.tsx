import { InputProps } from '@/components/ui';

export interface FormFieldProps extends InputProps {
    error?: string;
}

export const FormField = ({ error, ...rest }: FormFieldProps) => {
    console.log('error', error);
    return (
        <>
            <input {...rest} />
            {error && <span className="text-red-600">{error}</span>}
        </>
    );
};
