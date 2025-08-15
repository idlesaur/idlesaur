'use client';

import { Currency } from '@/generated/prisma';
import { useSession } from 'next-auth/react';

export const useCurrency = (): Currency => {
    const {
        data: {
            user: { currency },
        },
    } = useSession();

    return currency;
};
