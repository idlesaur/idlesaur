'use client';

import { type ReactNode, createContext, useRef, useContext } from 'react';
import { useStore } from 'zustand';

import {
    type ToastsStore,
    createToastsStore,
    ToastsState,
    createToastsState,
} from '@/state/stores';

export type ToastsStoreApi = ReturnType<typeof createToastsStore>;

export const ToastsStoreContext = createContext<ToastsStoreApi | undefined>(
    undefined,
);

export interface ToastsStoreProviderProps {
    children: ReactNode;
    initialState?: ToastsState;
}

export const ToastsStoreProvider = ({
    children,
    initialState = createToastsState(),
}: ToastsStoreProviderProps) => {
    const storeRef = useRef<ToastsStoreApi | null>(null);
    if (storeRef.current === null) {
        storeRef.current = createToastsStore(initialState);
    }

    return (
        <ToastsStoreContext.Provider value={storeRef.current}>
            {children}
        </ToastsStoreContext.Provider>
    );
};

export const useToastsStore = <T,>(selector: (store: ToastsStore) => T): T => {
    const toastStoreContext = useContext(ToastsStoreContext);

    if (!toastStoreContext) {
        throw new Error(
            `useToastsStore must be used within ToastsStoreProvider`,
        );
    }

    return useStore(toastStoreContext, selector);
};
