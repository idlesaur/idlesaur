'use client';

import React from 'react';
import { GiDinosaurRex } from 'react-icons/gi';

import { Button } from '@/components/ui';
import { type Dinosaur } from '@/generated/prisma';
import { GameCard, RenameDinoModal } from '@/components/page/game';

export interface ManageDinoCardProps {
    dinosaur: Dinosaur;
}

export const ManageDinoCard = ({ dinosaur }: ManageDinoCardProps) => {
    const [isRenameModalOpen, setIsRenameModalOpen] = React.useState(false);

    return (
        <GameCard icon={<GiDinosaurRex />} title={dinosaur.name}>
            <Button onClick={() => setIsRenameModalOpen(true)}>Rename</Button>
            {isRenameModalOpen && (
                <RenameDinoModal
                    open={isRenameModalOpen}
                    onClose={() => setIsRenameModalOpen(false)}
                />
            )}
        </GameCard>
    );
};
