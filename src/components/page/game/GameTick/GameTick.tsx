'use client';

import { useInterval } from '@/hooks';
import { useCurrencyStore, useUpgradesStore } from '@/state/providers';

import { getBonesPerSecond } from '@/util';

export const GameTick = () => {
    const boneDiggers = useUpgradesStore((state) => state.boneDiggers);
    const bones = useCurrencyStore((state) => state.bones);
    const setBones = useCurrencyStore((state) => state.setBones);

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
