import { describe, it, expect } from 'vitest';
import { userStateReducer } from './UserState';
import type { UserStateAction } from '@/state/actions';
import type { UserState } from '@/state/types';

describe('userStateReducer', () => {
    const initialState: UserState = {
        userName: 'InitialUser',
        profileImage: '/initial.png',
    };

    it('sets the user name when payload is provided', () => {
        const action: UserStateAction = {
            type: 'user_state/set_user_name',
            payload: 'NewUser',
        };
        const newState = userStateReducer(initialState, action);
        expect(newState.userName).toBe('NewUser');
        expect(newState.profileImage).toBe(initialState.profileImage);
    });

    it('keeps the same user name when payload is undefined', () => {
        const action: UserStateAction = {
            type: 'user_state/set_user_name',
            payload: undefined,
        };
        const newState = userStateReducer(initialState, action);
        expect(newState.userName).toBe('InitialUser');
    });

    it('sets the profile image when payload is provided', () => {
        const action: UserStateAction = {
            type: 'user_state/set_profile_image',
            payload: '/new.png',
        };
        const newState = userStateReducer(initialState, action);
        expect(newState.profileImage).toBe('/new.png');
        expect(newState.userName).toBe(initialState.userName);
    });

    it('keeps the same profile image when payload is undefined', () => {
        const action: UserStateAction = {
            type: 'user_state/set_profile_image',
            payload: undefined,
        };
        const newState = userStateReducer(initialState, action);
        expect(newState.profileImage).toBe('InitialUser'); // matches your reducer's logic
    });

    it('throws for an unknown action type', () => {
        // @ts-expect-error this type doesn't exist
        const action = { type: 'unknown_action' } as UserStateAction;
        expect(() => userStateReducer(initialState, action)).toThrowError(
            /Unknown action/,
        );
    });
});
