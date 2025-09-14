import { Profile } from '@/generated/prisma';
import { mockedDate } from '@/test/util';

export const mockProfile = (overrides?: Partial<Profile>): Profile => ({
    userName: 'tester',
    public: true,
    userId: 'test123',
    bio: 'I test things.',
    id: 'profile123',
    lastActive: mockedDate,
    ...overrides,
});
