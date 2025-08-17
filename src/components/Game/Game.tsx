import React from 'react';
import { BoneSystemCard } from '@/components/Game';
import { GameTick } from '@/components/GameTick';

export const Game = () => {
    return (
        <div className="flex flex-row items-start justify-center gap-3">
            <GameTick />
            <BoneSystemCard />
        </div>
    );
};
