import { createStore } from 'zustand';
import { ToastNotificationProps } from '@/components';
import { TOAST_NOTIFICATION_TIME } from '@/constants';

export interface ToastState extends ToastNotificationProps {
    timeLeft: number;
}

export type ToastsState = {
    toasts: ToastState[];
};

export type ToastsActions = {
    addSuccessToast: (title: string, content: string) => void;
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
                        title,
                        content,
                        variant: 'success',
                        timeLeft: TOAST_NOTIFICATION_TIME,
                    },
                ],
            })),
    }));
};
