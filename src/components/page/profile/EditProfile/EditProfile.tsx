'use client';

import React, { useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { ProfileType, Profile } from '@/schema';
import { Card, CardHeading, Form, FormField, Button } from '@/components/ui';
import { updateProfile } from '@/app/lib/actions';
import { useToastsStore } from '@/state/providers';

export interface EditProfileProps {
    profile: ProfileType;
}

export const EditProfile = ({ profile }: EditProfileProps) => {
    const { addSuccessToast, addErrorToast } = useToastsStore((state) => state);
    const [formState, formAction, isPending] = useActionState(updateProfile, {
        success: false,
    });
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isLoading },
    } = useForm<ProfileType>({
        defaultValues: profile,
        resolver: zodResolver(Profile),
    });

    useEffect(() => {
        if (isPending) {
            return;
        }

        if (formState?.success === false && formState?.message) {
            addErrorToast('Update Profile Failed', formState.message);
        }
        if (formState?.success === true && formState?.message) {
            addSuccessToast('Update Profile Success', formState.message);
        }
    }, [
        formState?.success,
        formState?.message,
        addErrorToast,
        addSuccessToast,
        isPending,
    ]);

    return (
        <Card>
            <CardHeading>Your Profile</CardHeading>
            <Form
                handleSubmit={handleSubmit}
                formAction={formAction}
                formState={formState}
                setError={setError}
            >
                <FormField
                    type="checkbox"
                    label="public"
                    register={register}
                    error={errors.public?.message}
                />
                <FormField
                    label="userName"
                    register={register}
                    required={true}
                    error={errors.userName?.message}
                />
                <FormField
                    label="bio"
                    register={register}
                    error={errors.bio?.message}
                />
                <Button
                    type="submit"
                    loading={isPending || isLoading}
                    className="mt-2 w-full"
                >
                    Update Profile
                </Button>
            </Form>
        </Card>
    );
};
