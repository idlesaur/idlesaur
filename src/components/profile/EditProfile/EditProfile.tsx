'use client';

import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { ProfileType, Profile } from '@/schema';
import { Heading, FormField, Button } from '@/components/ui';
import { updateProfile } from '@/app/lib/actions';
import { setErrorsFromServerErrors } from '@/util';

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

    const submitHandler: SubmitHandler<ProfileType> = async (
        data: ProfileType,
    ) => {
        const result = await updateProfile(data);
        setErrorsFromServerErrors(result, setError);
    };

    return (
        <div>
            <Heading level={2}>Profile</Heading>
            <form
                onSubmit={handleSubmit(submitHandler)}
                className="flex flex-col gap-2"
            >
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
                <Button type="submit">Update Profile</Button>
            </form>
        </div>
    );
};
