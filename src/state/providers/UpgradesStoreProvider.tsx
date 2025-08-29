'use client';

import { type ReactNode, createContext, useRef, useContext } from 'react';
import { useStore } from 'zustand';

import {
    type UpgradesStore,
    createUpgradesStore,
    UpgradesState,
    createUpgradesState,
} from '@/state/stores';

export type UpgradesStoreApi = ReturnType<typeof createUpgradesStore>;

export const UpgradesStoreContext = createContext<UpgradesStoreApi | undefined>(
    undefined,
);

export interface UpgradesStoreProviderProps {
    children: ReactNode;
    initialState?: UpgradesState;
}

export const UpgradesStoreProvider = ({
    children,
    initialState = createUpgradesState(),
}: UpgradesStoreProviderProps) => {
    const storeRef = useRef<UpgradesStoreApi | null>(null);
    if (storeRef.current === null) {
        storeRef.current = createUpgradesStore(initialState);
    }

    return (
        <UpgradesStoreContext.Provider value={storeRef.current}>
            {children}
        </UpgradesStoreContext.Provider>
    );
};

export const useUpgradesStore = <T,>(
    selector: (store: UpgradesStore) => T,
): T => {
    const counterStoreContext = useContext(UpgradesStoreContext);

    if (!counterStoreContext) {
        throw new Error(
            `useUpgradesStore must be used within UpgradesStoreProvider`,
        );
    }

    return useStore(counterStoreContext, selector);
};
