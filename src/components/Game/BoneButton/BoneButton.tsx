'use client';

import React from 'react';
import { PiBone } from 'react-icons/pi';
import { PriceButton } from '@/components/Game';

export const BoneButton = () => {
    const handleOnClick = (): void => {};

    return (
        <PriceButton
            onClick={handleOnClick}
            icon={<PiBone />}
            text="Dig for bones"
        />
    );
};
