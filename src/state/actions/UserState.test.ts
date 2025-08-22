// userStateActions.test.ts
import { describe, it, expect } from 'vitest';
import { setUserName, setProfileImage } from './UserState';

describe('user state actions', () => {
    it('setUserName returns correct action object', () => {
        const result = setUserName('Alice');
        expect(result).toEqual({
            type: 'user_state/set_user_name',
            payload: 'Alice',
        });
    });

    it('setProfileImage returns correct action object', () => {
        const result = setProfileImage('/img.png');
        expect(result).toEqual({
            type: 'user_state/set_profile_image',
            payload: '/img.png',
        });
    });
});
