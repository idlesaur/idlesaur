import { v4 as uuidv4 } from 'uuid';
import { type Dinosaur, type Profile } from '@/generated/prisma';
import { mockedDate } from '@/test/util';
import {
    ToastsState,
    ToastsStore,
    CurrencyState,
    CurrencyStore,
    UpgradesState,
    UpgradesStore,
    createToastsState,
    createCurrencyState,
    createUpgradesState,
} from '@/state/stores';
import { MockInstance, vi } from 'vitest';

export const mockProfile = (overrides?: Partial<Profile>): Profile => ({
    userName: 'tester',
    public: true,
    userId: 'test123',
    bio: 'I test things.',
    id: 'profile123',
    lastActive: mockedDate,
    ...overrides,
});

export const mockDinosaur = (overrides?: Partial<Dinosaur>): Dinosaur => ({
    userId: 'test123',
    id: uuidv4(),
    type: 'RAPTOR',
    alive: true,
    attack: 5,
    health: 5,
    defense: 5,
    experience: 0,
    nextLevelExperience: 100,
    level: 1,
    name: 'Test Dino',
    maxHealth: 5,
    special: 5,
    specialDefense: 5,
    speed: 5,
    ...overrides,
});

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
