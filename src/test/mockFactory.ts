import { v4 as uuidv4 } from 'uuid';
import { type Dinosaur, type Profile } from '@/generated/prisma';
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

export const mockDinosaur = (overrides?: Partial<Dinosaur>): Dinosaur => ({
    userId: 'test123',
    id: uuidv4(),
    type: 'RAPTOR',
    alive: true,
    attack: 5,
    health: 5,
    defense: 5,
    experience: 0,
    nextLevelExperience: 100,
    level: 1,
    name: 'Test Dino',
    maxHealth: 5,
    special: 5,
    specialDefense: 5,
    speed: 5,
    ...overrides,
});
