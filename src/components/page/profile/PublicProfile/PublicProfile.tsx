import React from 'react';
import { Profile } from '@/generated/prisma';
import { Card, CardHeading } from '@/components/ui';
import { getPublicProfileName } from '@/util';
import { CurrencyState } from '@/state/stores';
import { ResourceDisplay, ResourceType } from '@/components';

export interface PublicProfileProps {
    profile: Profile;
    currency?: CurrencyState;
    isOwnProfile?: boolean;
}

export const PublicProfile = ({ profile, currency }: PublicProfileProps) => {
    return (
        <Card className="w-xl">
            <CardHeading>
                {getPublicProfileName(profile?.userName, true)}
            </CardHeading>
            <div className="text-sm">
                Last active: {profile?.lastActive?.toLocaleDateString()}
            </div>
            <ResourceDisplay
                value={currency?.bones ?? 0}
                type={ResourceType.BONES}
            />
        </Card>
    );
};
