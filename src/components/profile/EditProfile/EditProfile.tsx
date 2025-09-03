'use client';

import React, { useActionState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { ProfileType, Profile } from '@/schema';
import { Heading, FormField } from '@/components/ui';
import { updateProfile, BaseServerActionResponse } from '@/app/lib/actions';

export interface EditProfileProps {
    profile: ProfileType;
}

export const EditProfile = ({ profile }: EditProfileProps) => {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(Profile),
    });

    const [state, updateProfileAction] = useActionState(
        async (
            _prevState: BaseServerActionResponse<ProfileType> | null,
            formData: FormData,
        ) => {
            const data = Object.fromEntries(formData) as ProfileType;
            const result = await updateProfile(data);

            if (!result.success && result.errors) {
                // Map server errors into RHF's errors
                Object.entries(result.errors).forEach(([field, messages]) => {
                    setError(field as keyof ProfileType, {
                        type: 'server',
                        message: (messages as string[])[0],
                    });
                });
            }

            return result;
        },
        null,
    );
    console.log('state', state);

    // Hybrid submit — validates with RHF, then sends FormData to server action
    const onValid = (data: ProfileType) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value as string);
        });
        updateProfileAction(formData);
    };

    return (
        <div>
            <Heading level={2}>Profile</Heading>
            <Heading level={4}>User: {profile.userName}</Heading>
            <form onSubmit={handleSubmit(onValid)} className="flex flex-col">
                <FormField
                    {...register('userName', { required: true })}
                    error={errors.userName?.message}
                />
                <FormField {...register('bio')} error={errors.bio?.message} />
                <input type="submit" />
            </form>
        </div>
    );
};
