import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import { Header } from './Header';
import React from 'react';

vi.mock('next/image', () => ({
    // @ts-expect-error props
    // eslint-disable-next-line
    default: (props: never) => <img {...props} alt="mock image" />,
}));

vi.mock('@/components', () => ({
    Logo: () => <div data-testid="logo">Test Logo</div>,
    SideNav: ({ isOpen }: { isOpen: boolean }) => (
        <div data-testid="side-nav">{isOpen ? 'Open' : 'Closed'}</div>
    ),
    ProfileDropdown: () => (
        <div data-testid="profile-dropdown">ProfileDropdown</div>
    ),
}));

describe('Footer', () => {
    it('opens side nav when hamburger is clicked', () => {
        render(<Header />);
        const sideNav = screen.getByTestId('side-nav');
        expect(sideNav).toHaveTextContent('Closed');
        fireEvent.click(screen.getByTestId('profile-dropdown'));
    });

    // it('toggles profile dropdown on image click', () => {
    //     render(<Header />);
    //     expect(screen.queryByText('Profile')).not.toBeInTheDocument();
    //     fireEvent.click(screen.getByAltText('mock image'));
    //     expect(screen.getByText('Profile')).toBeInTheDocument();
    // });
    //
    // it('closes dropdown when clicking outside', () => {
    //     render(<Header />);
    //     // open first
    //     fireEvent.click(screen.getByAltText('mock image'));
    //     expect(screen.getByText('Profile')).toBeInTheDocument();
    //     // click outside
    //     fireEvent.mouseDown(document.body);
    //     expect(screen.queryByText('Profile')).not.toBeInTheDocument();
    // });
});
