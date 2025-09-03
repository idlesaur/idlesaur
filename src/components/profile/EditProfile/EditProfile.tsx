'use client';

import React, { useActionState, startTransition } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
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
    } = useForm<ProfileType>({
        defaultValues: profile,
        resolver: zodResolver(Profile),
    });

    const [_, updateProfileAction] = useActionState(
        async (
            _prevState: BaseServerActionResponse<ProfileType> | null,
            formData: FormData,
        ) => {
            const data = Object.fromEntries(formData) as ProfileType;
            const result = await updateProfile(data);
            console.log('result: ', result);
            if (!result.success && result.errors) {
                // Map server errors into RHF's errors
                Object.entries(result.errors).forEach(([field, messages]) => {
                    console.log(messages);
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

    // Hybrid submit — validates with RHF, then sends FormData to server action
    const onValid: SubmitHandler<ProfileType> = (data: ProfileType) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value as string);
        });
        startTransition(() => updateProfileAction(formData));
    };

    return (
        <div>
            <Heading level={2}>Profile</Heading>
            <Heading level={4}>User: {profile.userName}</Heading>
            <form onSubmit={handleSubmit(onValid)} className="flex flex-col">
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
                <input type="submit" />
            </form>
        </div>
    );
};
