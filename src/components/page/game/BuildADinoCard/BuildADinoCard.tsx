'use client';

import React, { useActionState, useEffect } from 'react';
import { GiDinosaurRex } from 'react-icons/gi';
import { PiBone } from 'react-icons/pi';

import { formatNumber, getDinoCapacityIncreaseCost, getDinoCost } from '@/util';
import { GameCard, PriceButton } from '@/components/page/game';
import {
    useCurrencyStore,
    useDinosaursStore,
    useUpgradesStore,
} from '@/state/providers';
import { BuyDinosaurCapacityUpgradeState, BuyDinoState } from '@/app/lib/types';

export interface DinoSystemCardProps {
    buyDinoAction: (
        previousState: BuyDinoState | null,
        formData: FormData,
    ) => Promise<BuyDinoState>;
    buyDinosaurCapacityUpgradeAction: (
        previousState: BuyDinosaurCapacityUpgradeState | null,
        formData: FormData,
    ) => Promise<BuyDinosaurCapacityUpgradeState>;
}

export const BuildADinoCard = ({
    buyDinoAction,
    buyDinosaurCapacityUpgradeAction,
}: DinoSystemCardProps) => {
    const [buyDinoFormState, buyDinoFormAction, buyDinoIsPending] =
        useActionState(buyDinoAction, {
            success: false,
        });
    const [
        buyDinoCapacityFormState,
        buyDinoCapacityFormAction,
        buyDinoCapacityIsPending,
    ] = useActionState(buyDinosaurCapacityUpgradeAction, {
        success: false,
    });

    const dinosaurs = useDinosaursStore((state) => state.dinosaurs);
    const addDinosaur = useDinosaursStore((state) => state.addDinosaur);

    const bones = useCurrencyStore((state) => state.bones);
    const setBones = useCurrencyStore((state) => state.setBones);

    const dinosaurCapacity = useUpgradesStore(
        (state) => state.dinosaurCapacity,
    );
    const setDinosaurCapacity = useUpgradesStore(
        (state) => state.setDinosaurCapacity,
    );

    const dinoCost = getDinoCost(dinosaurs.length);
    const dinoCapacityIncreaseCost =
        getDinoCapacityIncreaseCost(dinosaurCapacity);
    const canAffordDino = bones >= dinoCost;
    const hasDinoCapacity = dinosaurCapacity > dinosaurs.length;
    const canBuildDino = canAffordDino && hasDinoCapacity;
    const canBuyDinoCapacity = bones >= dinoCapacityIncreaseCost;

    useEffect(() => {
        if (!buyDinoFormState?.success) {
            return;
        }

        if (buyDinoFormState?.bones) {
            setBones(buyDinoFormState.bones);
        }

        if (buyDinoFormState?.dino) {
            addDinosaur(buyDinoFormState.dino);
        }
    }, [
        buyDinoFormState?.success,
        buyDinoFormState?.dino,
        buyDinoFormState?.bones,
        setBones,
        addDinosaur,
    ]);

    useEffect(() => {
        if (!buyDinoCapacityFormState?.success) {
            return;
        }

        if (buyDinoCapacityFormState?.bones) {
            setBones(buyDinoCapacityFormState.bones);
        }

        if (buyDinoCapacityFormState?.dinosaurCapacity) {
            setDinosaurCapacity(buyDinoCapacityFormState.dinosaurCapacity);
        }
    }, [
        buyDinoCapacityFormState?.success,
        buyDinoCapacityFormState?.dinosaurCapacity,
        buyDinoCapacityFormState?.bones,
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
        </GameCard>
    );
};
