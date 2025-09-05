import React from 'react';
import { ProfileType } from '@/schema';
import { CardHeading, Card } from '@/components/ui';
import { getPublicProfileName } from '@/util';

export interface PublicProfileProps {
    profile: Partial<ProfileType>;
}

export const PublicProfile = ({ profile }: PublicProfileProps) => {
    return (
        <Card className="w-xl">
            <CardHeading>
                {getPublicProfileName(profile.userName, true)}
            </CardHeading>
        </Card>
    );
};
