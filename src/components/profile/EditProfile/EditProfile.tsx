'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { ProfileType, Profile } from '@/schema';
import { Heading, Form, FormField, Button } from '@/components/ui';
import { updateProfile } from '@/app/lib/actions';

export interface EditProfileProps {
    profile: ProfileType;
}

export const EditProfile = ({ profile }: EditProfileProps) => {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isLoading },
    } = useForm<ProfileType>({
        defaultValues: profile,
        resolver: zodResolver(Profile),
    });

    return (
        <div>
            <Heading level={2}>Profile</Heading>
            <Form
                handleSubmit={handleSubmit}
                setError={setError}
                onSubmit={updateProfile}
            >
                {({ isPending }) => (
                    <>
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
                        <Button type="submit" loading={isPending || isLoading}>
                            Update Profile
                        </Button>
                    </>
                )}
            </Form>
        </div>
    );
};
