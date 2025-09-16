'use client';

import React, { useActionState, useEffect } from 'react';
import { PiBone } from 'react-icons/pi';

import { Form, FormSlider } from '@/components/ui';
import { BoneButton } from '@/components/page/game/BoneButton';
import { GameCard } from '@/components/page/game/GameCard';
import { PriceButton } from '@/components/page/game/PriceButton';
import {
    formatNumber,
    getBoneDiggerCost,
    getMaxBoneDiggersCanAfford,
} from '@/util';
import { BASE_BONES_PER_SECOND_PER_DIGGER } from '@/constants';
import { useCurrencyStore, useUpgradesStore } from '@/state/providers';
import { FieldValues, useForm } from 'react-hook-form';
import { BuyBoneDiggerState } from '@/app/lib/types';
import { DigState } from '@/app/lib/actions/dig';

export interface PurchaseBoneDiggersInputs extends FieldValues {
    diggersToBuy: number;
}

export interface BoneSystemCardProps {
    buyBoneDiggersAction: (
        previousState: BuyBoneDiggerState | null,
        formData: FormData,
    ) => Promise<BuyBoneDiggerState>;
    digAction: () => Promise<DigState>;
}

export const BoneSystemCard = ({
    buyBoneDiggersAction,
    digAction,
}: BoneSystemCardProps) => {
    const [formState, formAction, isPending] = useActionState(
        buyBoneDiggersAction,
        {
            success: false,
        },
    );

    const { bones, setBones } = useCurrencyStore((state) => state);
    const { boneDiggers, setBoneDiggers } = useUpgradesStore((state) => state);

    const {
        register,
        handleSubmit,
        setError,
        formState: { isLoading },
        watch,
        reset,
    } = useForm<PurchaseBoneDiggersInputs>({
        defaultValues: {
            diggersToBuy: 1,
        },
    });

    useEffect(() => {
        if (!formState?.success) {
            return;
        }

        if (formState?.bones) {
            setBones(formState.bones);
        }

        if (formState?.boneDiggers) {
            setBoneDiggers(formState.boneDiggers);
        }
        reset();
    }, [
        formState?.success,
        formState?.boneDiggers,
        formState?.bones,
        setBones,
        setBoneDiggers,
        reset,
    ]);

    const amountBoneDiggersToBuy = watch('diggersToBuy');

    const boneDiggerCost = getBoneDiggerCost(
        boneDiggers,
        amountBoneDiggersToBuy,
    );
    const canAffordBoneDigger = bones >= boneDiggerCost;
    const bonesPerSecondFromDiggers =
        boneDiggers * BASE_BONES_PER_SECOND_PER_DIGGER;
    const maxBoneDiggersCanAfford = getMaxBoneDiggersCanAfford(
        bones,
        boneDiggers,
    );

    return (
        <GameCard icon={<PiBone />} title="Dino-bones">
            <div className="">Bones: {formatNumber(bones)}</div>
            <div className="">
                Bone-diggers: {boneDiggers} (
                {formatNumber(bonesPerSecondFromDiggers)} bones/ sec)
            </div>
            <BoneButton digAction={digAction} />

            <Form
                handleSubmit={handleSubmit}
                formAction={formAction}
                formState={formState}
                setError={setError}
                className="w-full"
            >
                <FormSlider
                    register={register}
                    label="diggersToBuy"
                    className="my-3"
                    min={1}
                    max={maxBoneDiggersCanAfford}
                />
                <PriceButton
                    icon={<PiBone />}
                    price={formatNumber(boneDiggerCost)}
                    text={`Buy ${amountBoneDiggersToBuy} Bone-digger${amountBoneDiggersToBuy > 1 ? 's' : ''}`}
                    type="submit"
                    className="w-full"
                    loading={isPending || isLoading}
                    disabled={
                        isPending ||
                        !canAffordBoneDigger ||
                        amountBoneDiggersToBuy <= 0
                    }
                />
            </Form>
        </GameCard>
    );
};
