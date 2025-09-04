import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getFullUserData } from '@/app/lib/data';
import { prisma } from '@/prisma';
import { Profile } from '@/generated/prisma';

// Mock prisma
vi.mock('@/prisma', () => ({
    prisma: {
        user: {
            findUnique: vi.fn(),
        },
    },
}));

describe('getFullUserData', () => {
    const mockFindUnique = vi.mocked(prisma.user.findUnique);

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('calls prisma.user.findUnique with correct args', async () => {
        mockFindUnique.mockResolvedValue({
            id: '123',
            profile: {} as Profile,
            currency: {},
            upgrades: {},
        } as never);

        const result = await getFullUserData('123');

        expect(mockFindUnique).toHaveBeenCalledWith({
            where: { id: '123' },
            include: {
                profile: true,
                currency: true,
                upgrades: true,
            },
        });
        expect(result).toEqual({
            id: '123',
            profile: {},
            currency: {},
            upgrades: {},
        });
    });

    it('returns null when user not found', async () => {
        mockFindUnique.mockResolvedValue(null);

        const result = await getFullUserData('456');

        expect(result).toBeNull();
        expect(mockFindUnique).toHaveBeenCalledWith({
            where: { id: '456' },
            include: {
                profile: true,
                currency: true,
                upgrades: true,
            },
        });
    });
});
