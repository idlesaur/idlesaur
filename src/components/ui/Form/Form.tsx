'use client';

import React, {
    startTransition,
    useActionState,
    useEffect,
    useRef,
} from 'react';
import { BaseServerActionResponse } from '@/app/lib/types';
import { setErrorsFromServerErrors } from '@/util';
import {
    FieldValues,
    UseFormSetError,
    UseFormHandleSubmit,
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
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (!formState || formState.success) {
            return;
        }
        setErrorsFromServerErrors(formState, setError);
    }, [formState, setError]);

    return (
        <form
            // onSubmit={handleSubmit(onSubmit)}
            onSubmit={(evt) => {
                evt.preventDefault();
                handleSubmit(() => {
                    startTransition(() =>
                        formAction(new FormData(formRef.current!)),
                    );
                })(evt);
            }}
            className="flex flex-col gap-2"
            ref={formRef}
        >
            {typeof children === 'function'
                ? children({ isPending, formState })
                : children}
        </form>
    );
};
