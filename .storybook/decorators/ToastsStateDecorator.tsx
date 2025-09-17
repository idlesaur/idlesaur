import React from 'react';
import { ToastsStoreProvider } from '@/state/providers';
import { ToastsState, createToastsState } from '@/state/stores';

export const withToastsState =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,react/display-name
    (initialState?: Partial<ToastsState>) => (Story: any) => (
        <ToastsStoreProvider initialState={createToastsState(initialState)}>
            <Story />
        </ToastsStoreProvider>
    );
