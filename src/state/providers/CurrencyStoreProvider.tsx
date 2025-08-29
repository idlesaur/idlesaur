'use client';

import { type ReactNode, createContext, useRef, useContext } from 'react';
import { useStore } from 'zustand';

import {
    type CurrencyStore,
    createCurrencyStore,
    CurrencyState,
    createCurrencyState,
} from '@/state/stores';

export type CurrencyStoreApi = ReturnType<typeof createCurrencyStore>;

export const CurrencyStoreContext = createContext<CurrencyStoreApi | undefined>(
    undefined,
);

export interface CurrencyStoreProviderProps {
    children: ReactNode;
    initialState?: CurrencyState;
}

export const CurrencyStoreProvider = ({
    children,
    initialState = createCurrencyState(),
}: CurrencyStoreProviderProps) => {
    const storeRef = useRef<CurrencyStoreApi | null>(null);
    if (storeRef.current === null) {
        storeRef.current = createCurrencyStore(initialState);
    }

    return (
        <CurrencyStoreContext.Provider value={storeRef.current}>
            {children}
        </CurrencyStoreContext.Provider>
    );
};

export const useCurrencyStore = <T,>(
    selector: (store: CurrencyStore) => T,
): T => {
    const currencyStoreContext = useContext(CurrencyStoreContext);

    if (!currencyStoreContext) {
        throw new Error(
            `useCurrencyStore must be used within CurrencyStoreProvider`,
        );
    }

    return useStore(currencyStoreContext, selector);
};
