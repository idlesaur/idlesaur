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
            className="w-full p-0"
            {...props}
            onClick={async () => await signOut()}
        >
            Sign Out
        </Button>
    );
};
