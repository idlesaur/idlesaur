'use client';

import React, { useActionState, startTransition, useEffect } from 'react';
import { dig } from '@/app/lib/actions';
import { useCurrencyStore } from '@/state/providers';
import { BoneButtonUI } from '@/components/page/game/BoneButton/BoneButtonUI';

export const BoneButton = () => {
    const [state, action, pending] = useActionState(dig, null);
    const { setBones } = useCurrencyStore((state) => state);

    // useEffect(() => {
    //     if (!state?.bones) {
    //         return;
    //     }
    //     setBones(state.bones);
    // }, [setBones, state?.bones]);

    return <BoneButtonUI onClick={() => {}} isPending={false} />;
};
