'use client';

import React, { ReactNode, useReducer } from 'react';
import { gameStateReducer } from '@/state/reducers';
import { GameStateContext, GameStateDispatchContext } from '@/state/context';
import { GameState } from '@/state/types';
import { createGameState } from '@/state/util';
import { useSession } from 'next-auth/react';

export interface GameStateProviderProps {
    initialState?: Partial<GameState>;
    children: ReactNode;
}

export const GameStateProvider = ({
    children,
    initialState,
}: GameStateProviderProps) => {
    const { data: session } = useSession();

    const bones = session?.user?.currency?.bones ?? undefined;

    const [gameState, dispatch] = useReducer(
        gameStateReducer,
        createGameState(initialState ?? { bones }),
    );

    return (
        <GameStateContext.Provider value={gameState}>
            <GameStateDispatchContext.Provider value={dispatch}>
                {children}
            </GameStateDispatchContext.Provider>
        </GameStateContext.Provider>
    );
};
