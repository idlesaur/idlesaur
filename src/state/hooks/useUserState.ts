'use client';

import { useContext } from 'react';
import { UserStateContext } from '@/state/context';
import { UserState } from '@/state/types';

export const useUserState = (): UserState => {
    const context = useContext(UserStateContext);
    if (!context) {
        throw new Error('useUserState must be used within a UserStateProvider');
    }
    return context;
};
