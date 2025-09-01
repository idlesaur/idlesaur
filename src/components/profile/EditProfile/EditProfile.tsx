'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import { ProfileType } from '@/schema';
import { Heading } from '@/components/ui';
import { updateProfile } from '@/app/lib/actions';

export interface EditProfileProps {
    profile: ProfileType;
}

export type EditProfileFormValues = {
    userName: string;
    bio: string;
};

export const EditProfile = ({ profile }: EditProfileProps) => {
    const { register, handleSubmit } = useForm<EditProfileFormValues>();
    // const [_, updateProfileAction] = useActionState(updateProfile, null);

    return (
        <div>
            <Heading level={2}>Profile</Heading>
            <Heading level={4}>{profile.userName}</Heading>
            <form onSubmit={handleSubmit(updateProfile)}>
                <input {...register('userName', { required: true })} />
                <input {...register('bio')} />
                <input type="submit" />
            </form>
        </div>
    );
};
