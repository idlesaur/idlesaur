'use client';

import React, { startTransition, useActionState, useEffect } from 'react';
import { BaseServerActionResponse } from '@/app/lib/types';
import { setErrorsFromServerErrors } from '@/util';
import {
    FieldValues,
    UseFormSetError,
    UseFormHandleSubmit,
    SubmitHandler,
} from 'react-hook-form';

export interface FormProps<T extends FieldValues> {
    children?: (formState: {
        isPending: boolean;
        formState: BaseServerActionResponse<T>;
    }) => React.ReactNode;
    handleSubmit: UseFormHandleSubmit<T>;
    setError: UseFormSetError<T>;
    onSubmit: (
        prevState: BaseServerActionResponse<T>,
        formData: FormData,
    ) => Promise<BaseServerActionResponse<T>> | BaseServerActionResponse<T>;
}

export const Form = <T extends FieldValues>({
    children,
    handleSubmit,
    onSubmit,
    setError,
}: FormProps<T>) => {
    const [formState, formAction, isPending] = useActionState(onSubmit, {
        success: false,
    });

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
            className="flex flex-col items-start gap-2"
        >
            {typeof children === 'function'
                ? children({ isPending, formState })
                : children}
        </form>
    );
};
