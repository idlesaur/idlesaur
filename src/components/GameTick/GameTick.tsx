'use client';

import { useInterval } from '@/hooks';
import { useGameState, useGameStateDispatch } from '@/state/hooks';
import { setBones } from '@/state/actions';
import { getBonesPerSecond } from '@/util';

export const GameTick = () => {
    const { bones, boneDiggers } = useGameState();
    const dispatch = useGameStateDispatch();

    useInterval((dt: number) => {
        const deltaSeconds: number = dt / 1000.0;
        const additionalBones: number =
            getBonesPerSecond(boneDiggers) * deltaSeconds;

        if (additionalBones > 0) {
            dispatch(setBones(bones + additionalBones));
        }
    });

    return null;
};
