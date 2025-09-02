'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { ProfileType, Profile } from '@/schema';
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
    const { register, handleSubmit } = useForm({
        resolver: zodResolver(Profile),
    });
    // const [_, updateProfileAction] = useActionState(updateProfile, null);

    async function onSubmit(data: ProfileType) {
        const result = await updateProfile(data);
        console.log('result', result);
    }

    return (
        <div>
            <Heading level={2}>Profile</Heading>
            <Heading level={4}>{profile.userName}</Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register('userName', { required: true })} />
                <input {...register('bio')} />
                <input type="submit" />
            </form>
        </div>
    );
};
