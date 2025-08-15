'use client';

import { signOut } from 'next-auth/react';
import React from 'react';
import { Button } from '@/components/ui';

export const SignOutButton = (
    props: React.ComponentPropsWithRef<typeof Button>,
) => {
    return (
        <Button
            variant="secondary"
            {...props}
            onClick={async () => await signOut()}
            className="w-24 p-0"
        >
            Sign Out
        </Button>
    );
};
