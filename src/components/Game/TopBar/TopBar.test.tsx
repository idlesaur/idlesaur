import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { useUserState } from '@/state/hooks/useUserState';
import { useGameState } from '@/state/hooks';
import { TopBar } from './TopBar';
import { GameState } from '@/state/types';
import { render } from '@/test/util';

vi.mock('next/image', () => ({
    // @ts-expect-error props
    // eslint-disable-next-line
    default: (props: never) => <img {...props} alt="mock image" />,
}));

vi.mock('@/components/Game', () => ({
    SideNav: ({ isOpen }: { isOpen: boolean }) => (
        <div data-testid="side-nav">{isOpen ? 'Open' : 'Closed'}</div>
    ),
}));

vi.mock('@/components', () => ({
    SignOutButton: () => <button data-testid="sign-out-btn">Sign Out</button>,
}));

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

    it('opens side nav when hamburger is clicked', () => {
        render(<TopBar />);
        const sideNav = screen.getByTestId('side-nav');
        expect(sideNav).toHaveTextContent('Closed');
        fireEvent.click(screen.getByRole('img', { hidden: true }));
    });

    it('toggles profile dropdown on image click', () => {
        render(<TopBar />);
        expect(screen.queryByText('Profile')).not.toBeInTheDocument();
        fireEvent.click(screen.getByAltText('mock image'));
        expect(screen.getByText('Profile')).toBeInTheDocument();
    });

    it('closes dropdown when clicking outside', () => {
        render(<TopBar />);
        // open first
        fireEvent.click(screen.getByAltText('mock image'));
        expect(screen.getByText('Profile')).toBeInTheDocument();
        // click outside
        fireEvent.mouseDown(document.body);
        expect(screen.queryByText('Profile')).not.toBeInTheDocument();
    });
});
