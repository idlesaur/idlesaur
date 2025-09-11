import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useGameState, useGameStateDispatch } from '@/state/hooks';
import { getDinoCost } from '@/util';
import { buildDino } from '@/state/actions';
import { DinoSystemCard } from '@/components/Game/DinoSystemCard';
import { createGameState } from '@/state/util';
import { createDino } from '@/state/util/createDino';

vi.mock('@/components/Game', async () => {
    const originalModule = await vi.importActual('@/components/Game');
    return { ...originalModule, BoneButton: () => <div>MockBoneButton</div> };
});

vi.mock('@/state/hooks', () => ({
    useGameState: vi.fn(),
    useGameStateDispatch: vi.fn(),
}));

vi.mock('@/util', async () => {
    const originalModule = await vi.importActual('@/util');

    return { ...originalModule, getDinoCost: vi.fn() };
});

vi.mock('@/state/actions', () => ({
    buildDino: vi.fn(),
}));

describe('<DinoSystemCard />', () => {
    it('renders bone stats and calls dispatch on purchase if affordable', async () => {
        const mockDispatch = vi.fn();
        const mockCost = 50;

        vi.mocked(useGameState).mockReturnValue(
            createGameState({
                bones: 100,
                maxDinos: 123,
            }),
        );

        vi.mocked(useGameStateDispatch).mockReturnValue(mockDispatch);
        vi.mocked(getDinoCost).mockReturnValue(mockCost);
        vi.mocked(buildDino).mockReturnValue({
            type: 'game_state/build_dino',
        });

        render(<DinoSystemCard />);

        // Text assertions
        expect(screen.getByText('Build-a-Dino')).toBeInTheDocument();
        expect(screen.getByText('Capacity: 0 / 123')).toBeInTheDocument();

        // button click
        const buildButton = screen.getByRole('button', {
            name: /build dinosaur/i,
        });

        expect(buildButton).toBeEnabled();
        await userEvent.click(buildButton);
        expect(mockDispatch).toHaveBeenCalledWith({
            type: 'game_state/build_dino',
        });
    });

    it('disables buy button if at max capacity', () => {
        vi.mocked(useGameState).mockReturnValue(
            createGameState({
                maxDinos: 1,
                dinos: [createDino()],
            }),
        );

        vi.mocked(useGameStateDispatch).mockReturnValue(vi.fn());
        vi.mocked(getDinoCost).mockReturnValue(50);

        render(<DinoSystemCard />);

        const buildButton = screen.getByRole('button', {
            name: /build dinosaur/i,
        });
        expect(buildButton).toBeDisabled();
    });
});
