import { createStore } from 'zustand';
import { Dinosaur } from '@/generated/prisma';

export type DinosaursState = {
    dinosaurs: Dinosaur[];
};

export type DinosaursActions = {
    addDinosaur: (dinosaur: Dinosaur) => void;
};

export type DinosaursStore = DinosaursState & DinosaursActions;

export const defaultDinosaursState: DinosaursState = {
    dinosaurs: [],
};

export const createDinosaursState = (
    overrideDefaults: Partial<DinosaursState> = {},
): DinosaursState => ({ ...defaultDinosaursState, ...overrideDefaults });

export const createDinosaursStore = (
    initState: DinosaursState = defaultDinosaursState,
) => {
    return createStore<DinosaursStore>()((set) => ({
        ...initState,
        addDinosaur: (dinosaur: Dinosaur) =>
            set((state) => ({ dinosaurs: [...state.dinosaurs, dinosaur] })),
    }));
};
