'use client';

import React from 'react';

import { useCurrencyStore } from '@/state/providers';
import { ResourceDisplay, ResourceType } from '@/components';

export const TopBar = () => {
    const { bones } = useCurrencyStore((state) => state);

    return (
        <div
            className="bg-background-900 sticky top-0 flex h-8 w-full flex-row items-center gap-3 p-1"
            data-testid="top-bar"
        >
            <ResourceDisplay value={bones} type={ResourceType.BONES} />
        </div>
    );
};
