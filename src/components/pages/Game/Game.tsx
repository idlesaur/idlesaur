'use client';

import { AutoSave, Game as GameContent, GameTick, TopBar } from '@/components';
import { GameStateProvider } from '@/state/providers';
import { useSession } from 'next-auth/react';

export const Game = () => {
    const { data } = useSession();

    if (!data?.user) {
        return null;
    }

    return (
        <GameStateProvider>
            <AutoSave />
            <GameTick />
            <div className="flex min-h-screen flex-col">
                <TopBar />
                <main className="flex flex-1 flex-col items-center justify-center">
                    <GameContent />
                </main>
                <footer className="flex flex-wrap items-center justify-center"></footer>
            </div>
        </GameStateProvider>
    );
};
