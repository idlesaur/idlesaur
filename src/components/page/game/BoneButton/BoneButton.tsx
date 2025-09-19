'use client';

import React, { startTransition, useActionState, useEffect } from 'react';
import { useCurrencyStore } from '@/state/providers';
import { BoneButtonUI } from '@/components/page/game/BoneButton/BoneButtonUI';
import { DigState } from '@/app/lib/actions/dig';

export interface BoneButtonProps {
    digAction: () => Promise<DigState>;
}

export const BoneButton = ({ digAction }: BoneButtonProps) => {
    const [state, action, pending] = useActionState(digAction, null);
    const setBones = useCurrencyStore((state) => state.setBones);

    useEffect(() => {
        if (!state?.bones) {
            return;
        }
        setBones(state.bones);
    }, [setBones, state?.bones]);

    return (
        <BoneButtonUI
            onClick={() => startTransition(action)}
            isPending={pending}
        />
    );
};
