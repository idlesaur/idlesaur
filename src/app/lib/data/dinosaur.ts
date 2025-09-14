import { prisma } from '@/prisma';

export interface GetPlayerDinosaursParams {
    userId: string;
    skip?: number;
    take?: number;
}

export const getPlayerDinosaurs = async ({
    userId,
    skip = 0,
    take = 10,
}: GetPlayerDinosaursParams) => {
    return prisma.dinosaur.findMany({ skip, take, where: { userId } });
};
