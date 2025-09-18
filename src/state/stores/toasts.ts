import { v4 as uuidv4 } from 'uuid';
import { createStore } from 'zustand';
import { NotificationVariant } from '@/components';
import React from 'react';

export interface ToastState {
    id: string;
    title: string;
    content?: React.ReactNode | string;
    variant: NotificationVariant;
}

export type ToastsState = {
    toasts: ToastState[];
};

export type ToastsActions = {
    removeToast: (id: string) => void;
    addSuccessToast: (title: string, content: string) => void;
    addErrorToast: (title: string, content: string) => void;
    addInfoToast: (title: string, content: string) => void;
    addWarningToast: (title: string, content: string) => void;
};

export type ToastsStore = ToastsState & ToastsActions;

export const defaultToastsState: ToastsState = {
    toasts: [],
};

export const createToastsState = (
    overrideDefaults: Partial<ToastsState> = {},
): ToastsState => ({ ...defaultToastsState, ...overrideDefaults });

export const createToastsStore = (
    initState: ToastsState = defaultToastsState,
) => {
    return createStore<ToastsStore>()((set) => ({
        ...initState,
        addSuccessToast: (title: string, content?: string) =>
            set((state) => ({
                toasts: [
                    ...state.toasts,
                    {
                        id: uuidv4(),
                        title,
                        content,
                        variant: 'success',
                    },
                ],
            })),
        addErrorToast: (title: string, content?: string) =>
            set((state) => ({
                toasts: [
                    ...state.toasts,
                    {
                        id: uuidv4(),
                        title,
                        content,
                        variant: 'error',
                    },
                ],
            })),
        addInfoToast: (title: string, content?: string) =>
            set((state) => ({
                toasts: [
                    ...state.toasts,
                    {
                        id: uuidv4(),
                        title,
                        content,
                        variant: 'info',
                    },
                ],
            })),
        addWarningToast: (title: string, content?: string) =>
            set((state) => ({
                toasts: [
                    ...state.toasts,
                    {
                        id: uuidv4(),
                        title,
                        content,
                        variant: 'warning',
                    },
                ],
            })),
        removeToast: (id: string) =>
            set((state) => ({
                toasts: state.toasts.filter((toast) => toast.id !== id),
            })),
    }));
};
