'use client';

import React, { startTransition, useActionState, useEffect } from 'react';
import { BaseServerActionResponse } from '@/app/lib/types';
import { setErrorsFromServerErrors } from '@/util';
import {
    FieldValues,
    UseFormSetError,
    UseFormHandleSubmit,
    SubmitHandler,
    FormState,
} from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

export interface FormProps<T extends FieldValues> {
    children?: React.ReactNode;
    handleSubmit: UseFormHandleSubmit<T>;
    setError: UseFormSetError<T>;
    // onSubmit: (
    //     prevState: BaseServerActionResponse<T>,
    //     formData: FormData,
    // ) => Promise<BaseServerActionResponse<T>> | BaseServerActionResponse<T>;
    formAction: (formData: FormData) => void;
    formState: BaseServerActionResponse<T>;
    className?: string;
}

export const Form = <T extends FieldValues>({
    children,
    handleSubmit,
    formAction,
    formState,
    setError,
    className,
}: FormProps<T>) => {
    useEffect(() => {
        if (!formState || formState.success) {
            return;
        }
        setErrorsFromServerErrors(formState, setError);
    }, [formState, setError]);

    const onRhfSubmit: SubmitHandler<T> = (data) => {
        const formData = new FormData();
        Object.keys(data).forEach((key) => formData.append(key, data[key]));
        startTransition(() => formAction(formData));
    };

    return (
        <form
            onSubmit={handleSubmit(onRhfSubmit)}
            className={twMerge('flex flex-col items-start gap-2', className)}
        >
            {children}
        </form>
    );
};
