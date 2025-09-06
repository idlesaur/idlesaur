// SignOutButton.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, beforeEach, it, expect } from 'vitest';
import { SignOutButton } from '@/components';

vi.mock('next-auth/react', () => ({
    signOut: vi.fn(),
}));

import { signOut } from 'next-auth/react';

describe('<SignOutButton />', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the button with correct text', () => {
        render(<SignOutButton />);
        expect(
            screen.getByRole('button', { name: /sign out/i }),
        ).toBeInTheDocument();
    });

    it('calls signOut when clicked', async () => {
        render(<SignOutButton />);
        const button = screen.getByRole('button', { name: /sign out/i });

        fireEvent.click(button);

        expect(signOut).toHaveBeenCalledTimes(1);
        expect(signOut).toHaveBeenCalledWith();
    });
});
