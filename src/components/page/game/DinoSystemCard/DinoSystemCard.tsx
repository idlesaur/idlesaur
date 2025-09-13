'use client';

import React, { useActionState, useEffect } from 'react';
import { GiDinosaurRex } from 'react-icons/gi';

import { Heading, Tooltip } from '@/components/ui';
import { buyDino } from '@/app/lib/actions';
import { formatNumber, getDinoCapacityIncreaseCost, getDinoCost } from '@/util';
import { Dinosaur } from '@/generated/prisma';
import { PiBone } from 'react-icons/pi';
import { DinoStats, GameCard, PriceButton } from '@/components/page/game';
import {
    useCurrencyStore,
    useDinosaursStore,
    useUpgradesStore,
} from '@/state/providers';
import { buyDinosaurCapacityUpgrade } from '@/app/lib/actions/buyDinosaurCapacityUpgrade';

export interface DinoIconProps {
    dinosaur: Dinosaur;
}

export const DinoIcon = ({ dinosaur }: DinoIconProps) => {
    return (
        <Tooltip content={<DinoStats dinosaur={dinosaur} />}>
            <div className="bg-background-900 flex h-14 w-14 flex-row items-start justify-between rounded-sm p-2">
                <GiDinosaurRex />
                <span>{dinosaur.level}</span>
            </div>
        </Tooltip>
    );
};

export const DinoSystemCard = () => {
    const [buyDinoFormState, buyDinoFormAction, buyDinoIsPending] =
        useActionState(buyDino, {
            success: false,
        });
    const [
        buyDinoCapacityFormState,
        buyDinoCapacityFormAction,
        buyDinoCapacityIsPending,
    ] = useActionState(buyDinosaurCapacityUpgrade, {
        success: false,
    });

    const { dinosaurs, addDinosaur } = useDinosaursStore((state) => state);
    const { bones, setBones } = useCurrencyStore((state) => state);
    const { dinosaurCapacity, setDinosaurCapacity } = useUpgradesStore(
        (state) => state,
    );

    const dinoCost = getDinoCost(dinosaurs.length);
    const dinoCapacityIncreaseCost =
        getDinoCapacityIncreaseCost(dinosaurCapacity);
    const canAffordDino = bones >= dinoCost;
    const hasDinoCapacity = dinosaurCapacity > dinosaurs.length;
    const canBuildDino = canAffordDino && hasDinoCapacity;
    const canBuyDinoCapacity = bones >= dinoCapacityIncreaseCost;

    useEffect(() => {
        if (!buyDinoFormState.success) {
            return;
        }

        if (buyDinoFormState.bones) {
            setBones(buyDinoFormState.bones);
        }

        if (buyDinoFormState.dino) {
            addDinosaur(buyDinoFormState.dino);
        }
    }, [
        buyDinoFormState.success,
        buyDinoFormState.dino,
        buyDinoFormState.bones,
        setBones,
        addDinosaur,
    ]);

    useEffect(() => {
        if (!buyDinoCapacityFormState.success) {
            return;
        }

        if (buyDinoCapacityFormState.bones) {
            setBones(buyDinoCapacityFormState.bones);
        }

        if (buyDinoCapacityFormState.dinosaurCapacity) {
            setDinosaurCapacity(buyDinoCapacityFormState.dinosaurCapacity);
        }
    }, [
        buyDinoCapacityFormState.success,
        buyDinoCapacityFormState.dinosaurCapacity,
        buyDinoCapacityFormState.bones,
        setDinosaurCapacity,
        setBones,
    ]);

    return (
        <GameCard icon={<GiDinosaurRex />} title="Build-a-Dino">
            <div>
                Capacity: {dinosaurs.length} {' / '} {dinosaurCapacity}
            </div>
            <form action={buyDinoCapacityFormAction}>
                <PriceButton
                    icon={<PiBone />}
                    price={formatNumber(dinoCapacityIncreaseCost)}
                    text="Increase Dinosaur Capacity"
                    disabled={!canBuyDinoCapacity || buyDinoCapacityIsPending}
                    type="submit"
                />
            </form>
            <form action={buyDinoFormAction}>
                <PriceButton
                    icon={<PiBone />}
                    price={formatNumber(dinoCost)}
                    text="Build Dinosaur"
                    type="submit"
                    disabled={!canBuildDino || buyDinoIsPending}
                />
            </form>
            {dinosaurs.length > 0 && (
                <div className="bg-background-800 flex w-11/12 flex-col items-center gap-y-2 rounded-xl p-2">
                    <Heading level={4}>Dinos</Heading>
                    <div className="flex flex-row flex-wrap gap-2">
                        {dinosaurs.map((dino) => (
                            <DinoIcon dinosaur={dino} key={dino.id} />
                        ))}
                    </div>
                </div>
            )}
        </GameCard>
    );
};
