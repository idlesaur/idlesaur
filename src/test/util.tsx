import React, { ReactNode } from 'react';
import {
    render as testingLibRender,
    RenderOptions,
} from '@testing-library/react';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

import { GameStateProvider, UserStateProvider } from '@/state/providers';
import { createGameState, createUserState } from '@/state/util';
import { GameState, UserState } from '@/state/types';

export interface WrapperOptions {
    session?: Session;
    gameState?: Partial<GameState>;
    userState?: Partial<UserState>;
}

const createWrapper = ({ session, gameState, userState }: WrapperOptions) => {
    // eslint-disable-next-line react/display-name
    return ({ children }: { children: React.ReactNode }): ReactNode => (
        <SessionProvider session={session ?? null}>
            <GameStateProvider initialState={createGameState(gameState)}>
                <UserStateProvider initialState={createUserState(userState)}>
                    {children}
                </UserStateProvider>
            </GameStateProvider>
        </SessionProvider>
    );
};

export const getRender = (wrapperOptions: WrapperOptions = {}) => {
    const wrapper = createWrapper(wrapperOptions);
    return (ui: React.ReactNode, options?: Partial<RenderOptions>) =>
        testingLibRender(ui, { wrapper, ...options });
};

export const render = getRender();
