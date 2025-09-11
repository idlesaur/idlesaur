import * as z from 'zod';
import { Dinosaur } from '@/generated/prisma';

export type ZodError<T = unknown> = z.core.$ZodError<T>;

export type ServerErrors<T> = Partial<Record<keyof T, string>>;

export interface BaseServerActionResponse<T> {
    success: boolean;
    message?: string;
    errors?: ServerErrors<T>;
}

export interface BuyBoneDiggerState extends BaseServerActionResponse<never> {
    bones?: number;
    boneDiggers?: number;
}

export interface BuyDinoState extends BaseServerActionResponse<never> {
    bones?: number;
    dino?: Dinosaur;
}
