import React, { ReactNode } from 'react';
import {
    render as testingLibRender,
    RenderOptions,
} from '@testing-library/react';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

import { GameStateProvider } from '@/state/providers';
import { createGameState } from '@/state/util';
import { GameState } from '@/state/types';

export interface WrapperOptions {
    session?: Session;
    gameState?: Partial<GameState>;
}

const createWrapper = ({ session, gameState }: WrapperOptions) => {
    // eslint-disable-next-line react/display-name
    return ({ children }: { children: React.ReactNode }): ReactNode => (
        <SessionProvider session={session ?? null}>
            <GameStateProvider initialState={createGameState(gameState)}>
                {children}
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
