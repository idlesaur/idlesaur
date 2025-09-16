export const prisma = {
    user: {
        findMany: async () => [{ id: '1', name: 'Mock User' }],
    },
    dinosaur: {
        findMany: async () => [{ id: 'd1', name: 'Mock Rex' }],
    },
};
