import React from 'react';
import { CurrencyStoreProvider } from '@/state/providers';
import { CurrencyState, createCurrencyState } from '@/state/stores';

export const withCurrencyState =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,react/display-name
    (initialState?: Partial<CurrencyState>) => (Story: any) => (
        <CurrencyStoreProvider initialState={createCurrencyState(initialState)}>
            <Story />
        </CurrencyStoreProvider>
    );
