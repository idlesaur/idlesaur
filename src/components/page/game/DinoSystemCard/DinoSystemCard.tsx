'use client';

import React, { useActionState, useEffect } from 'react';
import { GiDinosaurRex } from 'react-icons/gi';

import { Heading, Tooltip } from '@/components/ui';
import { buyDino } from '@/app/lib/actions';
import { formatNumber, getDinoCost } from '@/util';
import { Dinosaur } from '@/generated/prisma';
import { PiBone } from 'react-icons/pi';
import { DinoStats, GameCard, PriceButton } from '@/components/page/game';
import { useCurrencyStore } from '@/state/providers';

export interface DinoIconProps {
    dino: Dinosaur;
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
    const [formState, formAction, isPending] = useActionState(buyDino, {
        success: false,
    });

    const { bones, setBones } = useCurrencyStore((state) => state);

    const dinoCost = getDinoCost(1); // TODO: <--
    const canAffordDino = bones >= dinoCost;
    // const hasDinoCapacity = maxDinos > dinos.length;
    const hasDinoCapacity = true;
    const canBuildDino = canAffordDino && hasDinoCapacity;

    useEffect(() => {
        if (!formState.success) {
            return;
        }

        if (formState.bones) {
            setBones(formState.bones);
        }

        if (formState.dino) {
            // setBoneDiggers(formState.boneDiggers);
        }
    }, [formState.success, formState.dino, formState.bones, setBones]);

    return (
        <GameCard icon={<GiDinosaurRex />} title="Build-a-Dino">
            <form action={formAction}>
                <PriceButton
                    icon={<PiBone />}
                    price={formatNumber(dinoCost)}
                    text="Build Dinosaur"
                    type="submit"
                    disabled={!canBuildDino || isPending}
                />
            </form>
            <div className="bg-background-800 flex w-11/12 flex-col items-center gap-y-2 rounded-xl p-2">
                <Heading level={4}>Dinos</Heading>
                <div className="flex flex-row flex-wrap gap-2">
                    {/*{dinos.map((dino) => (*/}
                    {/*    <DinoIcon dino={dino} key={dino.id} />*/}
                    {/*))}*/}
                </div>
            </div>
        </GameCard>
    );
};
