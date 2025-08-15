'use client';

import React, { useCallback } from 'react';
import { PiBone } from 'react-icons/pi';

import { BoneButton, GameCard, PriceButton } from '@/components/Game';
import { formatNumber } from '@/util';
import { useCurrency } from '@/hooks/useCurrency';

export const BoneSystemCard = () => {
    const { bones } = useCurrency();

    const boneDiggerCost = 123;
    const canAffordBoneDigger = bones >= boneDiggerCost;
    // const bonesPerSecondFromDiggers =
    //     boneDiggers * BASE_BONES_PER_SECOND_PER_DIGGER;

    const handlePurchaseBoneDiggers = useCallback(() => {
        // dispatch(purchaseBoneDiggers());
    }, []);

    return (
        <GameCard icon={<PiBone />} title="Dino-bones">
            <div className="">Bones: {formatNumber(bones)}</div>
            <BoneButton />
            {/*<div className="">*/}
            {/*    Bone-diggers: {boneDiggers} (*/}
            {/*    {formatNumber(bonesPerSecondFromDiggers)} bones/ sec)*/}
            {/*</div>*/}
            <PriceButton
                icon={<PiBone />}
                price={formatNumber(boneDiggerCost)}
                text="Buy Bone-digger"
                onClick={handlePurchaseBoneDiggers}
                disabled={!canAffordBoneDigger}
            />
        </GameCard>
    );
};
