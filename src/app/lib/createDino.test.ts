import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createDino, generateName } from './createDino';
import { DinoType } from '@/state/types';

vi.mock('uuid', () => ({
    v4: vi.fn(() => 'mock-uuid'),
}));

vi.mock('@/util', () => ({
    randomItem: vi.fn(),
}));

import { randomItem } from '@/util';

describe('generateName', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should combine first part and title', () => {
        vi.mocked(randomItem)
            .mockReturnValueOnce('Fred') // firstParts
            .mockReturnValueOnce('the Destroyer'); // titles

        const name = generateName();
        expect(name).toBe('Fred the Destroyer');
        expect(randomItem).toHaveBeenNthCalledWith(
            1,
            expect.arrayContaining(['Fred', 'Tina', 'Gary']),
        );
        expect(randomItem).toHaveBeenNthCalledWith(
            2,
            expect.arrayContaining(['', 'the Destroyer', 'the Bonecrusher']),
        );
    });

    it('should trim extra spaces when title is empty', () => {
        vi.mocked(randomItem)
            .mockReturnValueOnce('Linda')
            .mockReturnValueOnce('');

        const name = generateName();
        expect(name).toBe('Linda'); // no trailing space
    });
});

describe('createDino', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should create a dino with default values', () => {
        vi.mocked(randomItem)
            .mockReturnValueOnce('Bob')
            .mockReturnValueOnce('the Bonecrusher');

        const dino = createDino();

        expect(dino).toEqual({
            id: 'mock-uuid',
            name: 'Bob the Bonecrusher',
            level: 1,
            experience: 0,
            nextLevelExperience: 10,
            type: DinoType.Raptor,
            alive: true,
            attack: 5,
            defense: 5,
            speed: 5,
            health: 15,
            maxHealth: 15,
        });
    });

    it('should allow overriding default values', () => {
        vi.mocked(randomItem)
            .mockReturnValueOnce('Steve')
            .mockReturnValueOnce('');

        const dino = createDino({
            level: 5,
            attack: 10,
            type: DinoType.Raptor,
        });

        expect(dino.level).toBe(5);
        expect(dino.attack).toBe(10);
        expect(dino.type).toBe(DinoType.Raptor);
        expect(dino.id).toBe('mock-uuid');
        expect(dino.name).toBe('Steve');
    });
});
