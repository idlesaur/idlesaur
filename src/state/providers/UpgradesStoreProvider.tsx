'use client';

import { type ReactNode, createContext, useRef, useContext } from 'react';
import { useStore } from 'zustand';

import {
    type UpgradesStore,
    createUpgradesStore,
} from '@/state/stores/upgrades';

export type UpgradesStoreApi = ReturnType<typeof createUpgradesStore>;

export const UpgradesStoreContext = createContext<UpgradesStoreApi | undefined>(
    undefined,
);

export interface UpgradesStoreProviderProps {
    children: ReactNode;
}

export const UpgradesStoreProvider = ({
    children,
}: UpgradesStoreProviderProps) => {
    const storeRef = useRef<UpgradesStoreApi | null>(null);
    if (storeRef.current === null) {
        storeRef.current = createUpgradesStore();
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
