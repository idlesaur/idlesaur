import {
    BASE_BONE_COST_BONE_DIGGER,
    BASE_BONES_PER_SECOND_PER_DIGGER,
} from '@/constants';
import { UpgradesState } from '@/state/stores';
import { RequireOnly } from '@/types';

export const getBoneDiggerCost = (
    currentBoneDiggers: number,
    quantity: number = 1,
) => {
    let totalCost = 0;
    for (let i = 0; i < quantity; i++) {
        const cost =
            Math.floor(
                (currentBoneDiggers + i) * BASE_BONE_COST_BONE_DIGGER * 1.1,
            ) + BASE_BONE_COST_BONE_DIGGER;
        totalCost += cost;
    }
    return totalCost;
};

export const getBonesPerClick = (
    gameState: RequireOnly<UpgradesState, 'boneDiggers'>,
): number => {
    return 1 + gameState.boneDiggers;
};

export const getBonesPerSecond = (boneDiggers: number): number => {
    return boneDiggers * BASE_BONES_PER_SECOND_PER_DIGGER;
};

export const formatNumber = (value: number): string => {
    return Math.floor(value).toLocaleString();
};

export const randomItem = <T>(arr: T[]): T => {
    return arr[Math.floor(Math.random() * arr.length)];
};

export const isNullOrWhitespace = (str: string | null | undefined): boolean => {
    return str === null || str === undefined || str.trim().length === 0;
};

export const generateSlug = (title: string): string => {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
};
