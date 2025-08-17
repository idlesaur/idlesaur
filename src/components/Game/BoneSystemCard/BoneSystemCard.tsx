'use client';
import React, { useActionState, startTransition, useEffect } from 'react';
import { PiBone } from 'react-icons/pi';

import { BoneButton, GameCard, PriceButton } from '@/components/Game';
import { formatNumber, getBoneDiggerCost } from '@/util';
import { useGameState, useGameStateDispatch } from '@/state/hooks';
import { BASE_BONES_PER_SECOND_PER_DIGGER } from '@/constants';
import { buyBoneDigger } from '@/app/actions';
import { setBones, setBoneDiggers } from '@/state/actions';

export const BoneSystemCard = () => {
    const { bones, boneDiggers } = useGameState();
    const dispatch = useGameStateDispatch();
    const [state, action, pending] = useActionState(buyBoneDigger, null);

    useEffect(() => {
        if (state?.totalBones) {
            dispatch(setBones(state.totalBones));
        }
        if (state?.boneDiggers) {
            dispatch(setBoneDiggers(state.boneDiggers));
        }
    }, [dispatch, state?.boneDiggers, state?.totalBones]);

    const boneDiggerCost = getBoneDiggerCost(boneDiggers);
    const canAffordBoneDigger = bones >= boneDiggerCost;
    const bonesPerSecondFromDiggers =
        boneDiggers * BASE_BONES_PER_SECOND_PER_DIGGER;

    return (
        <GameCard icon={<PiBone />} title="Dino-bones">
            <div className="">Bones: {formatNumber(bones)}</div>
            <div className="">
                Bone-diggers: {boneDiggers} (
                {formatNumber(bonesPerSecondFromDiggers)} bones/ sec)
            </div>
            <BoneButton />
            <PriceButton
                icon={<PiBone />}
                price={formatNumber(boneDiggerCost)}
                text="Buy Bone-digger"
                onClick={() => startTransition(action)}
                disabled={pending || !canAffordBoneDigger}
            />
        </GameCard>
    );
};
