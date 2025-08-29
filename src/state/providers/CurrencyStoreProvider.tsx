'use client';

import { type ReactNode, createContext, useRef, useContext } from 'react';
import { useStore } from 'zustand';

import {
    type CurrencyStore,
    createCurrencyStore,
} from '@/state/stores/currency';

export type CurrencyStoreApi = ReturnType<typeof createCurrencyStore>;

export const CurrencyStoreContext = createContext<CurrencyStoreApi | undefined>(
    undefined,
);

export interface CurrencyStoreProviderProps {
    children: ReactNode;
}

export const CurrencyStoreProvider = ({
    children,
}: CurrencyStoreProviderProps) => {
    const storeRef = useRef<CurrencyStoreApi | null>(null);
    if (storeRef.current === null) {
        storeRef.current = createCurrencyStore();
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
    const counterStoreContext = useContext(CurrencyStoreContext);

    if (!counterStoreContext) {
        throw new Error(
            `useCurrencyStore must be used within CurrencyStoreProvider`,
        );
    }

    return useStore(counterStoreContext, selector);
};
