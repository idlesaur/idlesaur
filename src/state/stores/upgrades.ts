import { createStore } from 'zustand';

export type UpgradesState = {
    boneDiggers: number;
};

export type UpgradesActions = {
    setBoneDiggers: (value: number) => void;
};

export type UpgradesStore = UpgradesState & UpgradesActions;

export const defaultUpgradesState: UpgradesState = {
    boneDiggers: 0,
};

export const createUpgradesState = (
    overrideDefaults: Partial<UpgradesState> = {},
): UpgradesState => ({ ...defaultUpgradesState, ...overrideDefaults });

export const createUpgradesStore = (
    initState: UpgradesState = defaultUpgradesState,
) => {
    return createStore<UpgradesStore>()((set) => ({
        ...initState,
        setBoneDiggers: (newBoneDiggers: number) =>
            set({ boneDiggers: newBoneDiggers }),
    }));
};
