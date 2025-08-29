import React from 'react';
import { UpgradesStoreProvider } from '@/state/providers';
import { UpgradesState, createUpgradesState } from '@/state/stores';

export const withUpgradesState =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,react/display-name
    (initialState?: Partial<UpgradesState>) => (Story: any) => (
        <UpgradesStoreProvider initialState={createUpgradesState(initialState)}>
            <Story />
        </UpgradesStoreProvider>
    );
