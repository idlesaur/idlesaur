'use client';

import React, { useCallback } from 'react';
import { GiDinosaurRex } from 'react-icons/gi';

import { Heading, Tooltip } from '@/components/ui';
import { useGameState, useGameStateDispatch } from '@/state/hooks';
import { buildDino, purchaseDinoCapacity } from '@/state/actions';
import { GameCard } from '@/components/Game/GameCard';
import { formatNumber } from '@/util';
import { Dino } from '@/state/types';
import { PiBone } from 'react-icons/pi';
import { DinoStats, PriceButton } from '@/components';

export interface DinoIconProps {
    dino: Dino;
}

export const DinoIcon = ({ dino }: DinoIconProps) => {
    return (
        <Tooltip content={<DinoStats dino={dino} />}>
            <div className="bg-background-900 flex h-14 w-14 flex-row items-start justify-between rounded-sm p-2">
                <GiDinosaurRex />
                <span>{dino.level}</span>
            </div>
        </Tooltip>
    );
};

export const DinoSystemCard = () => {
    const dispatch = useGameStateDispatch();
    const gameState = useGameState();
    const maxDinos = 0;
    const dinos: Dino[] = [];
    const { bones } = gameState;

    const dinoCost = 9001;
    const capacityCost = 0;
    const canAffordDino = bones >= dinoCost;
    const hasDinoCapacity = maxDinos > dinos.length;
    const canBuildDino = canAffordDino && hasDinoCapacity;

    const handleGrowDinosaurClicked = useCallback(() => {
        dispatch(buildDino());
    }, [dispatch]);

    const handleIncreaseCapacityClicked = useCallback(() => {
        dispatch(purchaseDinoCapacity());
    }, [dispatch]);
    const canIncreaseCapacity = bones >= capacityCost;

    return (
        <GameCard icon={<GiDinosaurRex />} title="Build-a-Dino">
            <div>
                Capacity: {dinos.length} {' / '} {maxDinos}
            </div>
            <PriceButton
                icon={<PiBone />}
                price={formatNumber(capacityCost)}
                text="Increase Capacity"
                onClick={handleIncreaseCapacityClicked}
                disabled={!canIncreaseCapacity}
            />
            <PriceButton
                icon={<PiBone />}
                price={formatNumber(dinoCost)}
                text="Build Dinosaur"
                onClick={handleGrowDinosaurClicked}
                disabled={!canBuildDino}
            />
            <div className="bg-background-800 flex w-11/12 flex-col items-center gap-y-2 rounded-xl p-2">
                <Heading level={4}>Dinos</Heading>
                <div className="flex flex-row flex-wrap gap-2">
                    {dinos.map((dino) => (
                        <DinoIcon dino={dino} key={dino.id} />
                    ))}
                </div>
            </div>
        </GameCard>
    );
};
