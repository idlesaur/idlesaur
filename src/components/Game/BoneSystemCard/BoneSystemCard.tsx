'use client';

import React, { useActionState, useEffect, useState } from 'react';
import { PiBone } from 'react-icons/pi';

import { Slider } from '@/components/ui';
import { BoneButton, GameCard, PriceButton } from '@/components/Game';
import { formatNumber, getBoneDiggerCost } from '@/util';
import { useGameState, useGameStateDispatch } from '@/state/hooks';
import { BASE_BONES_PER_SECOND_PER_DIGGER } from '@/constants';
import { buyBoneDiggers } from '@/app/actions';
import { setBones, setBoneDiggers } from '@/state/actions';

export const BoneSystemCard = () => {
    const { bones, boneDiggers } = useGameState();
    const dispatch = useGameStateDispatch();
    const [state, buyDiggersAction, pending] = useActionState(
        buyBoneDiggers,
        null,
    );
    const [amountBoneDiggersToBuy, setAmountBoneDiggersToBuy] = useState(1);

    useEffect(() => {
        if (state?.bones) {
            dispatch(setBones(state.bones));
        }
        if (state?.boneDiggers) {
            dispatch(setBoneDiggers(state.boneDiggers));
        }
    }, [dispatch, state?.boneDiggers, state?.bones]);

    const boneDiggerCost = getBoneDiggerCost(
        boneDiggers,
        amountBoneDiggersToBuy,
    );
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

            <form action={buyDiggersAction}>
                <Slider
                    value={amountBoneDiggersToBuy}
                    onChange={(val) => setAmountBoneDiggersToBuy(val)}
                    max={1000}
                    className="mt-3"
                    name="amountBoneDiggersToBuy"
                />
                <PriceButton
                    icon={<PiBone />}
                    price={formatNumber(boneDiggerCost)}
                    text={`Buy ${amountBoneDiggersToBuy} Bone-digger${amountBoneDiggersToBuy > 1 ? 's' : ''}`}
                    type="submit"
                    disabled={pending || !canAffordBoneDigger}
                />
            </form>
        </GameCard>
    );
};
