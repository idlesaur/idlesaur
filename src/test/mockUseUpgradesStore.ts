import { MockInstance, vi } from 'vitest';
import {
    createUpgradesState,
    UpgradesState,
    UpgradesStore,
} from '@/state/stores';

export const mockSetDinosaurCapacity = vi.fn();
export const mockSetBoneDiggers = vi.fn();
export const mockUseUpgradesStore = (
    mockUseUpgradesStoreInstance: MockInstance,
    state?: Partial<UpgradesState>,
) => {
    mockUseUpgradesStoreInstance.mockImplementation((selectorFn) =>
        selectorFn({
            ...createUpgradesState(state),
            setDinosaurCapacity: mockSetDinosaurCapacity,
            setBoneDiggers: mockSetBoneDiggers,
        } as UpgradesStore),
    );
};
