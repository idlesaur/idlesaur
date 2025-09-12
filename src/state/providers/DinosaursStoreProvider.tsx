'use client';

import { type ReactNode, createContext, useRef, useContext } from 'react';
import { useStore } from 'zustand';

import {
    type DinosaursStore,
    createDinosaursStore,
    DinosaursState,
    createDinosaursState,
} from '@/state/stores';

export type DinosaursStoreApi = ReturnType<typeof createDinosaursStore>;

export const DinosaursStoreContext = createContext<
    DinosaursStoreApi | undefined
>(undefined);

export interface DinosaursStoreProviderProps {
    children: ReactNode;
    initialState?: DinosaursState;
}

export const DinosaursStoreProvider = ({
    children,
    initialState = createDinosaursState(),
}: DinosaursStoreProviderProps) => {
    const storeRef = useRef<DinosaursStoreApi | null>(null);
    if (storeRef.current === null) {
        storeRef.current = createDinosaursStore(initialState);
    }

    return (
        <DinosaursStoreContext.Provider value={storeRef.current}>
            {children}
        </DinosaursStoreContext.Provider>
    );
};

export const useDinosaursStore = <T,>(
    selector: (store: DinosaursStore) => T,
): T => {
    const currencyStoreContext = useContext(DinosaursStoreContext);

    if (!currencyStoreContext) {
        throw new Error(
            `useDinosaursStore must be used within DinosaursStoreProvider`,
        );
    }

    return useStore(currencyStoreContext, selector);
};
