import React from 'react';
import { Heading } from '@/components/ui';
import { formatNumber } from '@/util';
import { Dino } from '@/state/types';

export const AttributeRow = ({
    name,
    value,
}: {
    name: string;
    value: number;
}) => {
    return (
        <div className="align-items-center flex flex-row justify-between">
            <div>{name}</div>
            <div>{formatNumber(value)}</div>
        </div>
    );
};

export interface DinoStatsProps {
    dino: Dino;
}

export const DinoStats = ({ dino }: DinoStatsProps) => (
    <div className="flex w-64 flex-col space-y-1">
        <Heading level={4}>{dino.name}</Heading>
        <div>
            Health {dino.health} {' / '} {dino.maxHealth}
        </div>
        <div>Level {dino.level}</div>
        <div>
            Exp {dino.experience} {' / '} {dino.nextLevelExperience}
        </div>
        <AttributeRow name="Attack" value={dino.attack} />
        <AttributeRow name="Defense" value={dino.defense} />
        <AttributeRow name="Speed" value={dino.speed} />
    </div>
);
