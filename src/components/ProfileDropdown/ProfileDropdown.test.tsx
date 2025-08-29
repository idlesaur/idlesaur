import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render, getRender } from '@/test/util';
import {
    ProfileDropdown,
    ProfileDropdownContent,
} from '@/components/ProfileDropdown';
import React from 'react';

vi.mock('next/image', () => ({
    // @ts-expect-error props
    // eslint-disable-next-line
    default: (props: never) => <img {...props} alt="mock image" />,
}));

// Mock SignOutButton to avoid auth dependencies
vi.mock('@/components', () => ({
    SignOutButton: () => <button>Sign Out</button>,
}));

describe('ProfileDropdownContent', () => {
    it('always shows Profile, Settings, and Sign Out', () => {
        render(<ProfileDropdownContent />);

        expect(screen.getByText('Profile')).toBeInTheDocument();
        expect(screen.getByText('Settings')).toBeInTheDocument();
        expect(screen.getByText('Sign Out')).toBeInTheDocument();
    });
});

describe('ProfileDropdown', () => {
    const user = userEvent.setup();

    const customRender = getRender({
        session: {
            user: {
                image: '/test-image.jpg',
                id: '',
                profile: null,
                currency: null,
                upgrades: null,
            },
            expires: '',
        },
    });

    it('toggles dropdown when mock image is clicked', async () => {
        customRender(<ProfileDropdown />);

        // Initially closed
        expect(screen.queryByText('Profile')).not.toBeInTheDocument();

        // Open
        await user.click(screen.getByAltText('mock image'));
        expect(screen.getByText('Profile')).toBeInTheDocument();

        // Close
        await user.click(screen.getByAltText('mock image'));
        expect(screen.queryByText('Profile')).not.toBeInTheDocument();
    });

    it('closes dropdown when clicking outside', async () => {
        customRender(
            <div>
                <ProfileDropdown />
                <div data-testid="outside">Outside</div>
            </div>,
        );

        // Open
        await user.click(screen.getByAltText('mock image'));
        expect(screen.getByText('Profile')).toBeInTheDocument();

        // Click outside
        await user.click(screen.getByTestId('outside'));
        expect(screen.queryByText('Profile')).not.toBeInTheDocument();
    });
});
