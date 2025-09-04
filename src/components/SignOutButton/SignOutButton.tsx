'use client';

import React from 'react';
import { signOut } from 'next-auth/react';
import { twMerge } from 'tailwind-merge';

import { Button } from '@/components/ui';

export const SignOutButton = (
    props: React.ComponentPropsWithRef<typeof Button>,
) => {
    return (
        <Button
            variant="secondary"
            {...props}
            onClick={async () => await signOut()}
            className={twMerge('w-24 p-0', props.className)}
        >
            Sign Out
        </Button>
    );
};
