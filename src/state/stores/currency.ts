import { createStore } from 'zustand';

export type CurrencyState = {
    bones: number;
};

export type CurrencyActions = {
    setBones: (value: number) => void;
};

export type CurrencyStore = CurrencyState & CurrencyActions;

export const defaultCurrencyState: CurrencyState = {
    bones: 0,
};

export const createCurrencyState = (
    overrideDefaults: Partial<CurrencyState> = {},
): CurrencyState => ({ ...defaultCurrencyState, ...overrideDefaults });

export const createCurrencyStore = (
    initState: CurrencyState = defaultCurrencyState,
) => {
    return createStore<CurrencyStore>()((set) => ({
        ...initState,
        setBones: (newBones: number) => set({ bones: newBones }),
    }));
};
