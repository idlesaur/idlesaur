import { describe, expect, it } from 'vitest';
import { gameStateReducer } from '@/state/reducers';
import {
    GameStateAction,
    purchaseBoneDiggers,
    setBones,
} from '@/state/actions';
import { createGameState } from '@/state/util';

describe('gameStateReducer', () => {
    it('sets bones correctly', () => {
        const initialState = createGameState({ bones: 10 });
        const action = setBones(5);
        const newState = gameStateReducer(initialState, action);
        expect(newState.bones).toBe(5);
    });

    it('purchases bone-digger correctly', () => {
        const initialState = createGameState({ bones: 100 });
        const action = purchaseBoneDiggers(1);
        const newState = gameStateReducer(initialState, action);
        expect(newState.bones).toBe(85);
        expect(newState.boneDiggers).toBe(1);
    });

    it('does not purchase bone-digger when cost is too high', () => {
        const initialState = createGameState({ bones: 1 });
        const action = purchaseBoneDiggers(1);
        const newState = gameStateReducer(initialState, action);
        expect(newState.bones).toBe(1);
        expect(newState.boneDiggers).toBe(0);
    });

    it('uses 0 as fallback if payload is undefined', () => {
        const initialState = createGameState({ bones: 42 });
        const action = { type: 'game_state/set_bones' } as GameStateAction;
        const newState = gameStateReducer(initialState, action);
        expect(newState.bones).toBe(42); // no change
    });

    it('throws an error on unknown action type', () => {
        const initialState = createGameState();
        const action = { type: 'unknown' } as never;
        expect(() => gameStateReducer(initialState, action)).toThrow(
            /Unknown action: unknown/,
        );
    });
    //
    // it('buildDino builds correctly', () => {
    //     const initialState = createGameState({ bones: 10000 });
    //     expect(initialState.dinos.length).toBe(0);
    //     const action = buildDino();
    //     const newState = gameStateReducer(initialState, action);
    //     expect(newState.dinos.length).toBe(1);
    // });
    //
    // it('buildDino fails when can not afford', () => {
    //     const initialState = createGameState({ bones: 0 });
    //     expect(initialState.dinos.length).toBe(0);
    //     const action = buildDino();
    //     const newState = gameStateReducer(initialState, action);
    //     expect(newState.dinos.length).toBe(0);
    // });
});
