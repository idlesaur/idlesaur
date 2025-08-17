import { describe, expect, it } from 'vitest';
import { setBones, setBoneDiggers } from '@/state/actions/GameState';

describe('setBones', () => {
    it('returns expected action', () => {
        expect(setBones(42)).toEqual({
            payload: 42,
            type: 'game_state/set_bones',
        });
        expect(setBones(-1)).toEqual({
            payload: -1,
            type: 'game_state/set_bones',
        });
    });
});

describe('setBoneDiggers', () => {
    it('returns expected action', () => {
        expect(setBoneDiggers(42)).toEqual({
            payload: 42,
            type: 'game_state/set_bone_diggers',
        });
        expect(setBoneDiggers(-1)).toEqual({
            payload: -1,
            type: 'game_state/set_bone_diggers',
        });
    });
});
