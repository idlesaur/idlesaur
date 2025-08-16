'use client';

import React from 'react';
import { PiBone } from 'react-icons/pi';

import { BoneButton, GameCard } from '@/components/Game';
import { formatNumber } from '@/util';
import { useGameState } from '@/state/hooks';

export const BoneSystemCard = () => {
    const { bones } = useGameState();

    return (
        <GameCard icon={<PiBone />} title="Dino-bones">
            <div className="">Bones: {formatNumber(bones)}</div>
            <BoneButton />
        </GameCard>
    );
};
