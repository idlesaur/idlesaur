import { describe, it, expect, vi } from 'vitest';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render, getRender } from '@/test/util';
import {
    ProfileDropdown,
    ProfileDropdownContent,
} from '@/components/ProfileDropdown';
import React from 'react';
import { Routes } from '@/constants';

vi.mock('next/navigation');

vi.mock('next/link', () => ({
    // @ts-expect-error we like unknown in tests
    default: ({ href, children, ...rest }: unknown) => (
        <a href={href} {...rest}>
            {children}
        </a>
    ),
}));

vi.mock('next/image', () => ({
    default: (props: never) => (
        // @ts-expect-error props
        // eslint-disable-next-line @next/next/no-img-element
        <img {...props} alt={props.alt ?? 'mock image'} />
    ),
}));

// Mock SignOutButton to avoid auth dependencies
vi.mock('@/components', () => ({
    SignOutButton: () => <button>Sign Out</button>,
}));

describe('ProfileDropdownContent', () => {
    const customRender = getRender({
        session: {
            user: {
                id: '',
                image: '/test-image.jpg',
                profile: {
                    userName: 'TestUser',
                    id: '',
                    public: false,
                    bio: '',
                    userId: '',
                },
                currency: null,
                upgrades: null,
            },
            expires: '',
        },
    });

    it('always shows Edit Profile, Settings, and Sign Out', () => {
        render(<ProfileDropdownContent />);
        expect(screen.getByText('Edit Profile')).toBeInTheDocument();
        expect(screen.getByText('Settings')).toBeInTheDocument();
        expect(screen.getByText('Sign Out')).toBeInTheDocument();
    });

    it('renders userName and profile image when available', () => {
        customRender(<ProfileDropdownContent />);

        const img = screen.getByAltText('Profile Image');
        expect(img).toBeInTheDocument();

        const link = screen.getByRole('link', { name: 'TestUser' });
        expect(link).toHaveAttribute('href', Routes.PUBLIC_PROFILE('TestUser'));
    });

    it('does not render profile image or name if null/whitespace', () => {
        const nullUserRender = getRender({
            session: {
                user: {
                    id: '',
                    image: null,
                    profile: {
                        userName: '   ',
                        id: '',
                        public: false,
                        bio: '',
                        userId: '',
                    },
                    currency: null,
                    upgrades: null,
                },
                expires: '',
            },
        });

        nullUserRender(<ProfileDropdownContent />);

        // Only the edit profile link should be present
        expect(
            screen.queryByRole('link', { name: /^(?!Edit Profile).+/ }),
        ).not.toBeInTheDocument();
        expect(screen.queryByAltText('Profile Image')).not.toBeInTheDocument();
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

    it('toggles dropdown when image is clicked', async () => {
        customRender(<ProfileDropdown />);
        expect(screen.queryByText('Edit Profile')).not.toBeInTheDocument();

        await user.click(screen.getByAltText('Profile Image'));
        expect(screen.getByText('Edit Profile')).toBeInTheDocument();

        await user.click(screen.getByAltText('Profile Image'));
        expect(screen.queryByText('Edit Profile')).not.toBeInTheDocument();
    });

    it('closes dropdown when clicking outside', async () => {
        customRender(
            <div>
                <ProfileDropdown />
                <div data-testid="outside">Outside</div>
            </div>,
        );

        await user.click(screen.getByAltText('Profile Image'));
        expect(screen.getByText('Edit Profile')).toBeInTheDocument();

        await user.click(screen.getByTestId('outside'));
        expect(screen.queryByText('Edit Profile')).not.toBeInTheDocument();
    });

    it('closes dropdown when clicking a link inside it', async () => {
        customRender(<ProfileDropdown />);

        await user.click(screen.getByAltText('Profile Image'));
        const dropdown = screen.getByText('Edit Profile').closest('div');
        await user.click(
            within(dropdown!).getByRole('link', { name: 'Edit Profile' }),
        );

        expect(screen.queryByText('Edit Profile')).not.toBeInTheDocument();
    });
});
