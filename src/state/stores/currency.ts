import { createStore } from 'zustand';

export type CurrencyState = {
    bones: number;
};

export type CurrencyActions = {
    setBones: (value: number) => void;
};

export type CurrencyStore = CurrencyState & CurrencyActions;

export const defaultInitState: CurrencyState = {
    bones: 0,
};

export const createCurrencyStore = (
    initState: CurrencyState = defaultInitState,
) => {
    return createStore<CurrencyStore>()((set) => ({
        ...initState,
        setBones: (newBones: number) => set({ bones: newBones }),
    }));
};
