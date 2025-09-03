import { FieldValues, Path, UseFormSetError } from 'react-hook-form';
import {
    BASE_BONE_COST_BONE_DIGGER,
    BASE_BONES_PER_SECOND_PER_DIGGER,
} from '@/constants';
import { UpgradesState } from '@/state/stores';
import { RequireOnly } from '@/types';
import { BaseServerActionResponse } from '@/app/lib/actions';

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

export const camelCaseToWords = (s: string) => {
    const result = s.replace(/([A-Z])/g, ' $1');
    return result.charAt(0).toUpperCase() + result.slice(1);
};

export function setErrorsFromServerErrors<T extends FieldValues>(
    result: BaseServerActionResponse<T>,
    setError: UseFormSetError<T>,
) {
    if (!result.success && result.errors) {
        Object.entries(result.errors).forEach(([field, message]) => {
            setError(field as Path<T>, {
                type: 'server',
                message: message as string,
            });
        });
    }
}
