'use client';

import React from 'react';
import { GiDinosaurRex } from 'react-icons/gi';

import { Tooltip } from '@/components/ui';
import { type Dinosaur } from '@/generated/prisma';
import { DinoStats, GameCard } from '@/components/page/game';
import { useDinosaursStore } from '@/state/providers';

export interface DinoIconProps {
    dinosaur: Dinosaur;
    onClick?: (dinosaur: Dinosaur) => void;
}

export const DinoIcon = ({ dinosaur, onClick }: DinoIconProps) => {
    return (
        <Tooltip content={<DinoStats dinosaur={dinosaur} />}>
            <div
                onClick={() => onClick?.(dinosaur)}
                className="bg-background-900 border-background-800 hover:bg-background-950 flex h-14 w-14 flex-row items-start justify-between rounded-sm border-1 p-2 transition-all hover:border-white"
            >
                <GiDinosaurRex />
                <span>{dinosaur.level}</span>
            </div>
        </Tooltip>
    );
};

export const DinosCard = () => {
    const dinosaurs = useDinosaursStore((state) => state.dinosaurs);
    const setSelectedDinosaur = useDinosaursStore(
        (state) => state.setSelectedDinosaur,
    );

    if (!dinosaurs?.length) {
        return null;
    }

    return (
        <GameCard icon={<GiDinosaurRex />} title="Dinos">
            <div className="bg-background-800 flex w-full flex-col items-center gap-y-2 rounded-xl p-2">
                <div className="flex flex-row flex-wrap gap-2">
                    {dinosaurs.map((dino) => (
                        <DinoIcon
                            dinosaur={dino}
                            key={dino.id}
                            onClick={(dino) => setSelectedDinosaur(dino)}
                        />
                    ))}
                </div>
            </div>
        </GameCard>
    );
};
