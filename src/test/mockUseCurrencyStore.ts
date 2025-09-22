import { MockInstance, vi } from 'vitest';
import {
    createCurrencyState,
    CurrencyState,
    CurrencyStore,
} from '@/state/stores';

export const mockSetBones = vi.fn();
export const mockUseCurrencyStore = (
    mockUseCurrencyStoreInstance: MockInstance,
    state?: Partial<CurrencyState>,
) => {
    mockUseCurrencyStoreInstance.mockImplementation((selectorFn) =>
        selectorFn({
            ...createCurrencyState(state),
            setBones: mockSetBones,
        } as CurrencyStore),
    );
};
