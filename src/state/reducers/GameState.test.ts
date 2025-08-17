import { describe, expect, it } from 'vitest';
import { gameStateReducer } from '@/state/reducers';
import { GameStateAction, setBoneDiggers, setBones } from '@/state/actions';
import { createGameState } from '@/state/util';

describe('gameStateReducer', () => {
    it('sets bones correctly', () => {
        const initialState = createGameState({ bones: 10 });
        const action = setBones(5);
        const newState = gameStateReducer(initialState, action);
        expect(newState.bones).toBe(5);
    });

    it('sets bone-diggers correctly', () => {
        const initialState = createGameState({ boneDiggers: 1 });
        const action = setBoneDiggers(3);
        const newState = gameStateReducer(initialState, action);
        expect(newState.boneDiggers).toBe(3);
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
});
