'use client';

import React from 'react';
import { GiDinosaurRex } from 'react-icons/gi';

import { Button } from '@/components/ui';
import { type Dinosaur } from '@/generated/prisma';
import { GameCard } from '@/components/page/game';

export interface ManageDinoCardProps {
    dinosaur: Dinosaur;
}

export const ManageDinoCard = ({ dinosaur }: ManageDinoCardProps) => {
    return (
        <GameCard icon={<GiDinosaurRex />} title={dinosaur.name}>
            <Button>Rename</Button>
        </GameCard>
    );
};
