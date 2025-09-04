'use client';

import React, { useActionState, useEffect, useState } from 'react';
import { PiBone } from 'react-icons/pi';

import { Slider } from '@/components/ui';
import { BoneButton, GameCard, PriceButton } from '@/components/game';
import { formatNumber, getBoneDiggerCost } from '@/util';
import { BASE_BONES_PER_SECOND_PER_DIGGER } from '@/constants';
import { buyBoneDiggers } from '@/app/lib/actions';
import { useCurrencyStore, useUpgradesStore } from '@/state/providers';

export const BoneSystemCard = () => {
    const { bones, setBones } = useCurrencyStore((state) => state);
    const { boneDiggers, setBoneDiggers } = useUpgradesStore((state) => state);

    const [state, buyDiggersAction, pending] = useActionState(
        buyBoneDiggers,
        null,
    );
    const [amountBoneDiggersToBuy, setAmountBoneDiggersToBuy] = useState(1);

    useEffect(() => {
        if (state?.bones !== undefined) {
            setBones(state.bones);
        }
        if (state?.boneDiggers !== undefined) {
            setBoneDiggers(state.boneDiggers);
        }
    }, [setBoneDiggers, setBones, state?.boneDiggers, state?.bones]);

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
                    allowEdit={true}
                    value={amountBoneDiggersToBuy}
                    onChange={(val) => setAmountBoneDiggersToBuy(val)}
                    className="my-3"
                    name="amountBoneDiggersToBuy"
                />
                <PriceButton
                    icon={<PiBone />}
                    price={formatNumber(boneDiggerCost)}
                    text={`Buy ${amountBoneDiggersToBuy} Bone-digger${amountBoneDiggersToBuy > 1 ? 's' : ''}`}
                    type="submit"
                    disabled={
                        pending ||
                        !canAffordBoneDigger ||
                        amountBoneDiggersToBuy <= 0
                    }
                />
            </form>
        </GameCard>
    );
};
