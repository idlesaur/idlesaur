import React from 'react';
import { screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { useUserState } from '@/state/hooks/useUserState';
import { useGameState } from '@/state/hooks';
import { TopBar } from './TopBar';
import { GameState } from '@/state/types';
import { render } from '@/test/util';

vi.mock('@/state/hooks', () => ({
    useGameState: vi.fn(),
}));

vi.mock('@/state/hooks/useUserState', () => ({
    useUserState: vi.fn(),
}));

describe('TopBar', () => {
    const mockUseGameState = vi.mocked(useGameState);
    const mockUseUserState = vi.mocked(useUserState);

    beforeEach(() => {
        vi.clearAllMocks();
        mockUseGameState.mockReturnValue({ bones: 42 } as GameState);
        mockUseUserState.mockReturnValue({
            userName: 'TestUser',
            profileImage: '/test.png',
        });
    });

    it('renders with bones value', () => {
        render(<TopBar />);
        expect(screen.getByText('42')).toBeInTheDocument();
    });
});
