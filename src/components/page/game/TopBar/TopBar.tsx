'use client';

import React from 'react';

import { useCurrencyStore } from '@/state/providers';
import { ResourceDisplay, ResourceType } from '@/components';

export const TopBar = () => {
    const bones = useCurrencyStore((state) => state.bones);

    return (
        <div
            className="bg-background-900 top-16 flex h-8 w-full flex-row items-center gap-3 p-1"
            data-testid="top-bar"
        >
            <ResourceDisplay value={bones} type={ResourceType.BONES} />
        </div>
    );
};
