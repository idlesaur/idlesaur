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
        include: {
            profile: true,
            currency: true,
            upgrades: true,
        },
    });
};
