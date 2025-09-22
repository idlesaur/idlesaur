import { MockInstance, vi } from 'vitest';
import { createToastsState, ToastsState, ToastsStore } from '@/state/stores';

export const mockRemoveToast = vi.fn();
export const mockAddSuccessToast = vi.fn();
export const mockAddErrorToast = vi.fn();
export const mockAddWarningToast = vi.fn();
export const mockAddInfoToast = vi.fn();
export const mockUseToastsStore = (
    mockUseToastsStoreInstance: MockInstance,
    state?: Partial<ToastsState>,
) => {
    mockUseToastsStoreInstance.mockImplementation((selectorFn) =>
        selectorFn({
            ...createToastsState(state),
            removeToast: mockRemoveToast,
            addSuccessToast: mockAddSuccessToast,
            addErrorToast: mockAddErrorToast,
            addWarningToast: mockAddWarningToast,
            addInfoToast: mockAddInfoToast,
        } as ToastsStore),
    );
};
