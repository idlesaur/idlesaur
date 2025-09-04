'use client';

import { useInterval } from '@/hooks';
import { useCurrencyStore, useUpgradesStore } from '@/state/providers';

import { getBonesPerSecond } from '@/util';

export const GameTick = () => {
    const { boneDiggers } = useUpgradesStore((state) => state);
    const { bones, setBones } = useCurrencyStore((state) => state);

    useInterval((dt: number) => {
        const deltaSeconds = dt / 1000.0;
        const additionalBones: number =
            getBonesPerSecond(boneDiggers) * deltaSeconds;

        if (additionalBones > 0) {
            setBones(bones + additionalBones);
        }
    });

    return null;
};
