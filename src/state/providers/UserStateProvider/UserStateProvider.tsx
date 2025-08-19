'use client';

import React, { ReactNode, useReducer } from 'react';
import { userStateReducer } from '@/state/reducers';
import { UserStateContext, UserStateDispatchContext } from '@/state/context';
import { UserState } from '@/state/types';
import { createUserState } from '@/state/util';
import { useSession } from 'next-auth/react';

export interface UserStateProviderProps {
    initialState?: Partial<UserState>;
    children: ReactNode;
}

export const UserStateProvider = ({
    children,
    initialState,
}: UserStateProviderProps) => {
    const { data: session, status } = useSession();

    const userName = session?.user?.profile?.userName ?? undefined;
    const profileImage = session?.user?.image ?? undefined;

    const [userState, dispatch] = useReducer(
        userStateReducer,
        createUserState(initialState ?? { profileImage, userName }),
    );

    if (status === 'loading') {
        return null;
    }

    return (
        <UserStateContext.Provider value={userState}>
            <UserStateDispatchContext.Provider value={dispatch}>
                {children}
            </UserStateDispatchContext.Provider>
        </UserStateContext.Provider>
    );
};
