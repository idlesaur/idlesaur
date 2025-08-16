'use client';

import React, { ReactNode, useReducer } from 'react';
import { LoadingIndicator } from '@/components';
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
    const { data: session, status } = useSession();

    const bones = session?.user?.currency?.bones ?? 0;

    const [gameState, dispatch] = useReducer(
        gameStateReducer,
        createGameState(initialState ?? { bones }),
    );

    if (status === 'loading') {
        return (
            <div className="flex min-h-screen w-screen flex-col items-center justify-center">
                <LoadingIndicator />
            </div>
        );
    }

    return (
        <GameStateContext.Provider value={gameState}>
            <GameStateDispatchContext.Provider value={dispatch}>
                {children}
            </GameStateDispatchContext.Provider>
        </GameStateContext.Provider>
    );
};
