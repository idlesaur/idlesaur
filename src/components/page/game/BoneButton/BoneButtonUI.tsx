'use client';

import React from 'react';
import { PiBone } from 'react-icons/pi';
import { PriceButton } from '@/components/page/game/PriceButton';

export interface BoneSystemCardUIProps {
    onClick: () => void;
    isPending: boolean;
}

export const BoneButtonUI = ({ onClick, isPending }: BoneSystemCardUIProps) => {
    return (
        <PriceButton
            onClick={onClick}
            icon={<PiBone />}
            text="Dig for bones"
            disabled={isPending}
        />
    );
};
