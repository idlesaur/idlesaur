'use client';

import { Currency } from '@/generated/prisma';
import { useSession } from 'next-auth/react';

const getDefaultCurrency = (): Currency => ({
    bones: 1234,
    id: '',
    userId: '',
});

export const useCurrency = (): Currency => {
    const { data } = useSession();
    const currency = data?.user?.currency;

    if (!currency) {
        return getDefaultCurrency();
    }

    return currency;
};
