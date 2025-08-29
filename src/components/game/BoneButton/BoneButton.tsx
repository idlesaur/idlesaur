'use client';

import React, { useActionState, startTransition, useEffect } from 'react';
import { PiBone } from 'react-icons/pi';
import { PriceButton } from '@/components/game';
import { dig } from '@/app/lib/actions';
import { useCurrencyStore } from '@/state/providers';

export const BoneButton = () => {
    const [state, action, pending] = useActionState(dig, null);
    const { setBones } = useCurrencyStore((state) => state);

    useEffect(() => {
        if (!state?.bones) {
            return;
        }
        setBones(state.bones);
    }, [state?.bones]);

    return (
        <PriceButton
            onClick={() => startTransition(action)}
            icon={<PiBone />}
            text="Dig for bones"
            disabled={pending}
        />
    );
};
