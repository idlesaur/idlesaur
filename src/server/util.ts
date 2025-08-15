import { prisma } from '@/prisma';

export const getFullUserData = async (userId: string) => {
    return prisma.user.findUnique({
        where: { id: userId },
        include: {
            profile: true,
            currency: true,
        },
    });
};
