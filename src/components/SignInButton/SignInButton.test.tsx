import React from 'react';
import { signIn } from 'next-auth/react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, beforeEach, it, expect } from 'vitest';
import { SignInButton } from '@/components';

// Mock next-auth/react
vi.mock('next-auth/react', () => ({
    signIn: vi.fn(),
}));

describe('<SignInButton />', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the button with correct text', () => {
        render(<SignInButton />);
        expect(
            screen.getByRole('button', { name: /sign in/i }),
        ).toBeInTheDocument();
    });

    it('calls signIn with redirect when clicked', () => {
        render(<SignInButton />);
        const button = screen.getByRole('button', { name: /sign in/i });

        fireEvent.click(button);

        expect(signIn).toHaveBeenCalledTimes(1);
        expect(signIn).toHaveBeenCalledWith(undefined, { redirectTo: '/game' });
    });
});
