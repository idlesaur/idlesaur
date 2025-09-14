import React from 'react';
import { DinosaursStoreProvider } from '@/state/providers';
import { DinosaursState, createDinosaursState } from '@/state/stores';

export const withDinosaursState =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,react/display-name
    (initialState?: Partial<DinosaursState>) => (Story: any) => (
        <DinosaursStoreProvider
            initialState={createDinosaursState(initialState)}
        >
            <Story />
        </DinosaursStoreProvider>
    );
