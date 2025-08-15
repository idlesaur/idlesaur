'use client';

import React, { useActionState, startTransition, useEffect } from 'react';
import { PiBone } from 'react-icons/pi';
import { PriceButton } from '@/components/Game';
import { dig } from '@/app/actions';
import { useGameStateDispatch } from '@/state/hooks';
import { setBones } from '@/state/actions';

export const BoneButton = () => {
    const [state, action, pending] = useActionState(dig, null);
    const dispatch = useGameStateDispatch();

    useEffect(() => {
        if (!state?.totalBones) {
            return;
        }
        dispatch(setBones(state.totalBones));
    }, [dispatch, state?.totalBones]);

    return (
        <PriceButton
            onClick={() => startTransition(action)}
            icon={<PiBone />}
            text="Dig for bones"
            disabled={pending}
        />
    );
};
