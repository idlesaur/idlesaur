'use client';

// import React from 'react';
import React, { useActionState, startTransition } from 'react';
import { PiBone } from 'react-icons/pi';
import { PriceButton } from '@/components/Game';
import { dig } from '@/app/actions';

export const BoneButton = () => {
    const [state, action, pending] = useActionState(dig, null);
    console.log('state', state);
    return (
        <PriceButton
            onClick={async () => startTransition(action)}
            icon={<PiBone />}
            text="Dig for bones"
            disabled={pending}
        />
    );
};
