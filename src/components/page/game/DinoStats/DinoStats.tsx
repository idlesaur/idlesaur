import React from 'react';
import { Heading } from '@/components/ui';
import { formatNumber } from '@/util';
import { Dinosaur } from '@/generated/prisma';

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
    dinosaur: Dinosaur;
}

export const DinoStats = ({ dinosaur }: DinoStatsProps) => (
    <div className="flex w-64 flex-col space-y-1">
        <Heading level={4}>{dinosaur.name}</Heading>
        <div>
            Health {dinosaur.health} {' / '} {dinosaur.maxHealth}
        </div>
        <div>Level {dinosaur.level}</div>
        <div>
            Exp {dinosaur.experience} {' / '} {dinosaur.nextLevelExperience}
        </div>
        <AttributeRow name="Attack" value={dinosaur.attack} />
        <AttributeRow name="Defense" value={dinosaur.defense} />
        <AttributeRow name="Speed" value={dinosaur.speed} />
    </div>
);
