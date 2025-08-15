import { describe, it, vi, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BoneButton } from './BoneButton';

import { useGameState, useGameStateDispatch } from '@/state/hooks';
import { getBonesPerClick } from '@/util';
import { setBones } from '@/state/actions';
import { createGameState } from '@/state/util';

// Mock dependencies
vi.mock('@/state/hooks', { spy: true });

vi.mock('@/util', { spy: true });

vi.mock('@/state/actions', { spy: true });

describe('<BoneButton />', () => {
    it('dispatches setBones when clicked', async () => {
        const mockDispatch = vi.fn();
        const mockGameState = createGameState({ bones: 5 });
        const mockBonesPerClick = 3;

        // Setup mocks
        vi.mocked(useGameState).mockReturnValue(mockGameState);
        vi.mocked(useGameStateDispatch).mockReturnValue(mockDispatch);
        vi.mocked(getBonesPerClick).mockReturnValue(mockBonesPerClick);
        vi.mocked(setBones).mockReturnValue({
            type: 'game_state/set_bones',
            payload: mockBonesPerClick,
        });

        render(<BoneButton />);

        const button = screen.getByRole('button', { name: /dig for bones/i });
        await userEvent.click(button);

        expect(getBonesPerClick).toHaveBeenCalledWith(mockGameState);
        expect(setBones).toHaveBeenCalledWith(mockBonesPerClick);
        expect(mockDispatch).toHaveBeenCalledWith({
            type: 'game_state/set_bones',
            payload: mockBonesPerClick,
        });
    });
});
