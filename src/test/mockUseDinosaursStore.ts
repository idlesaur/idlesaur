import { MockInstance, vi } from 'vitest';
import {
    createDinosaursState,
    DinosaursState,
    DinosaursStore,
} from '@/state/stores';

export const mockAddDinosaur = vi.fn();
export const mockSetSelectedDinosaur = vi.fn();
export const mockUpdateDinosaur = vi.fn();

export const mockUseDinosaursStore = (
    mockUseDinosaursStoreInstance: MockInstance,
    state?: Partial<DinosaursState>,
) => {
    mockUseDinosaursStoreInstance.mockImplementation((selectorFn) =>
        selectorFn({
            ...createDinosaursState(state),
            addDinosaur: mockAddDinosaur,
            setSelectedDinosaur: mockSetSelectedDinosaur,
            updateDinosaur: mockUpdateDinosaur,
        } as DinosaursStore),
    );
};
