import * as z from 'zod';
import { FieldValues } from 'react-hook-form';
import { ServerErrors, ZodError } from '@/app/lib/types';

export function flattenZodError<T extends FieldValues>(
    error: ZodError<T>,
): ServerErrors<T> {
    return Object.fromEntries(
        error.issues.map((issue) => [issue.path[0], issue.message]),
    ) as ServerErrors<T>;
}

export function toZodErrorMany<T extends FieldValues>(
    errors: Partial<Record<keyof T, string>>,
): ZodError<T> {
    const issues = Object.entries(errors)
        .filter(([, message]) => !!message)
        .map(([field, message]) => ({
            code: 'custom' as const,
            message: message as string,
            path: [field as keyof T],
        }));

    return new z.core.$ZodError(issues) as ZodError<T>;
}

export function mergeZodErrors<T extends FieldValues>(
    ...errors: (ZodError<T> | undefined | null)[]
): ZodError<T> {
    const mergedIssues = errors
        .filter((e): e is ZodError<T> => e instanceof z.core.$ZodError)
        .flatMap((err) => err.issues);

    return new z.core.$ZodError(mergedIssues) as ZodError<T>;
}
