import { BASE_BONE_COST_BONE_DIGGER } from '@/constants';
import { GameState } from '@/state/types';
import { RequireOnly } from '@/types';

export const getBoneDiggerCost = (
    gameState: RequireOnly<GameState, 'boneDiggers'>,
    quantity: number = 1,
) => {
    let totalCost = 0;
    for (let i = 0; i < quantity; i++) {
        const cost =
            Math.floor(
                (gameState.boneDiggers + i) * BASE_BONE_COST_BONE_DIGGER * 1.1,
            ) + BASE_BONE_COST_BONE_DIGGER;
        totalCost += cost;
    }
    return totalCost;
};

export const getBonesPerClick = (
    gameState: RequireOnly<GameState, 'boneDiggers'>,
): number => {
    return 1 + gameState.boneDiggers;
};

export const formatNumber = (value: number): string => {
    return Math.floor(value).toLocaleString();
};

export const randomItem = <T>(arr: T[]): T => {
    return arr[Math.floor(Math.random() * arr.length)];
};
