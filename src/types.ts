import type { Profile, Currency, Upgrades } from '@/generated/prisma/client';

export type RequireOnly<T, K extends keyof T> = Pick<T, K> &
    Partial<Omit<T, K>>;

export type SessionUser = {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    profile: Profile | null;
    currency: Currency | null;
    upgrades: Upgrades | null;
};
