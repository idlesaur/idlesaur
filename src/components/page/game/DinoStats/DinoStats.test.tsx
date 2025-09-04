import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from '@/test/util';
import { AttributeRow, DinoStats } from './DinoStats';
import { formatNumber } from '@/util';
import type { Dino } from '@/state/types';
import { createDino } from '@/state/util';

vi.mock('@/util', async () => {
    const originalModule = await vi.importActual('@/util');
    return {
        ...originalModule,
        formatNumber: vi.fn((n: number) => `formatted-${n}`),
    };
});

describe('AttributeRow', () => {
    it('renders the name and formatted value', () => {
        render(<AttributeRow name="Attack" value={42} />);
        expect(screen.getByText('Attack')).toBeInTheDocument();
        expect(screen.getByText('formatted-42')).toBeInTheDocument();
        expect(formatNumber).toHaveBeenCalledWith(42);
    });
});

describe('DinoStats', () => {
    const mockDino: Dino = createDino({
        name: 'Chompy',
        health: 50,
        maxHealth: 100,
        level: 3,
        experience: 120,
        nextLevelExperience: 200,
        attack: 10,
        defense: 5,
        speed: 8,
    });

    it('renders heading with dino name', () => {
        render(<DinoStats dino={mockDino} />);
        expect(
            screen.getByRole('heading', { level: 4, name: 'Chompy' }),
        ).toBeInTheDocument();
    });

    it('renders health correctly', () => {
        render(<DinoStats dino={mockDino} />);
        expect(screen.getByText(/Health 50 \/ 100/)).toBeInTheDocument();
    });

    it('renders level correctly', () => {
        render(<DinoStats dino={mockDino} />);
        expect(screen.getByText('Level 3')).toBeInTheDocument();
    });

    it('renders experience correctly', () => {
        render(<DinoStats dino={mockDino} />);
        expect(screen.getByText(/Exp 120 \/ 200/)).toBeInTheDocument();
    });

    it('renders all attributes', () => {
        render(<DinoStats dino={mockDino} />);
        expect(screen.getByText('Attack')).toBeInTheDocument();
        expect(screen.getByText('Defense')).toBeInTheDocument();
        expect(screen.getByText('Speed')).toBeInTheDocument();
    });
});
