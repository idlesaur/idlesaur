'use client';

import React, { useState } from 'react';
import { GiDinosaurRex } from 'react-icons/gi';

import { Button } from '@/components/ui';
import { GameCard, RenameDinoModal } from '@/components/page/game';
import { useDinosaursStore } from '@/state/providers';
import { RenameDinoState } from '@/app/lib/types';

export interface ManageDinoCardProps {
    renameDinosaurAction: (
        previousState: RenameDinoState | null,
        formData: FormData,
    ) => Promise<RenameDinoState>;
}

export const ManageDinoCard = ({
    renameDinosaurAction,
}: ManageDinoCardProps) => {
    const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
    const dinosaur = useDinosaursStore((state) => state.selectedDinosaur);

    if (!dinosaur) {
        return null;
    }

    return (
        <GameCard icon={<GiDinosaurRex />} title={dinosaur.name}>
            <Button onClick={() => setIsRenameModalOpen(true)}>Rename</Button>
            {isRenameModalOpen && (
                <RenameDinoModal
                    open={isRenameModalOpen}
                    onClose={() => setIsRenameModalOpen(false)}
                    renameDinosaurAction={renameDinosaurAction}
                />
            )}
        </GameCard>
    );
};
