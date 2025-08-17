'use client';

import { useInterval } from '@/hooks';
import { BASE_BONES_PER_SECOND_PER_DIGGER } from '@/constants';
import { useGameState, useGameStateDispatch } from '@/state/hooks';
import { setBones } from '@/state/actions';

export const GameTick = () => {
    const { bones, boneDiggers } = useGameState();
    const dispatch = useGameStateDispatch();

    useInterval((dt: number) => {
        const deltaSeconds: number = dt / 1000.0;
        const additionalBones: number =
            boneDiggers * BASE_BONES_PER_SECOND_PER_DIGGER * deltaSeconds;

        if (additionalBones > 0) {
            dispatch(setBones(bones + additionalBones));
        }
    });

    return null;
};
