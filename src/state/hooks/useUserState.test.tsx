import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useUserState } from './useUserState';
import { UserStateContext } from '@/state/context';
import type { UserState } from '@/state/types';

describe('useUserState', () => {
    const mockUserState: UserState = {
        userName: 'TestUser',
        profileImage: '/test.png',
    };

    it('returns context value when inside provider', () => {
        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <UserStateContext.Provider value={mockUserState}>
                {children}
            </UserStateContext.Provider>
        );

        const { result } = renderHook(() => useUserState(), { wrapper });
        expect(result.current).toEqual(mockUserState);
    });

    it('throws when used outside provider', () => {
        expect(() => renderHook(() => useUserState())).toThrow(
            'useUserState must be used within a UserStateProvider',
        );
    });
});
