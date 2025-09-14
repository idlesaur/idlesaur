import { prisma } from '@/prisma';
import { PrismaClient } from '@/generated/prisma';

export type PrismaTransactionalClient = Parameters<
    Parameters<PrismaClient['$transaction']>[0]
>[0];

export interface GetUserDataParams {
    userId: string;
    tx?: PrismaTransactionalClient;
}

export const getUserData = ({ userId, tx }: GetUserDataParams) => {
    const user = tx?.user ?? prisma.user;

    return user.findUnique({
        where: { id: userId },
    });
};

export const getUserCurrency = ({ userId, tx }: GetUserDataParams) => {
    const currency = tx?.currency ?? prisma.currency;

    return currency.findUnique({
        where: { userId },
    });
};

export const getPlayerUpgrades = ({ userId, tx }: GetUserDataParams) => {
    const upgrades = tx?.upgrades ?? prisma.upgrades;

    return upgrades.findUnique({
        where: { userId },
    });
};
