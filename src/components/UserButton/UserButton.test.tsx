// UserButton.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import { UserButton } from './UserButton';

// Mock SignInButton and SignOutButton to make tests simpler
vi.mock('@/components', () => ({
    SignInButton: () => <button>Mock Sign In</button>,
    SignOutButton: () => <button>Mock Sign Out</button>,
}));

describe('<UserButton />', () => {
    it('renders SignInButton when not logged in', () => {
        render(<UserButton isLoggedIn={false} />);

        // Only sign-in button should be there
        expect(
            screen.getByRole('button', { name: /mock sign in/i }),
        ).toBeInTheDocument();
        expect(
            screen.queryByRole('button', { name: /mock sign out/i }),
        ).not.toBeInTheDocument();
    });

    it('renders name and SignOutButton when logged in', () => {
        render(<UserButton isLoggedIn={true} name="Alice" />);

        // Shows the user's name
        expect(screen.getByText('Alice')).toBeInTheDocument();
        // Shows sign-out button
        expect(
            screen.getByRole('button', { name: /mock sign out/i }),
        ).toBeInTheDocument();
        // Does not show sign-in button
        expect(
            screen.queryByRole('button', { name: /mock sign in/i }),
        ).not.toBeInTheDocument();
    });

    it('still renders SignOutButton without a name', () => {
        render(<UserButton isLoggedIn={true} />);

        expect(
            screen.getByRole('button', { name: /mock sign out/i }),
        ).toBeInTheDocument();
    });
});
