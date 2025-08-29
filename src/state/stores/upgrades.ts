import { createStore } from 'zustand';

export type UpgradesState = {
    boneDiggers: number;
};

export type UpgradesActions = {
    setBoneDiggers: (value: number) => void;
};

export type UpgradesStore = UpgradesState & UpgradesActions;

export const defaultInitState: UpgradesState = {
    boneDiggers: 0,
};

export const createUpgradesStore = (
    initState: UpgradesState = defaultInitState,
) => {
    return createStore<UpgradesStore>()((set) => ({
        ...initState,
        setBoneDiggers: (newBoneDiggers: number) =>
            set({ boneDiggers: newBoneDiggers }),
    }));
};
