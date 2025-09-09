import * as z from 'zod';

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
