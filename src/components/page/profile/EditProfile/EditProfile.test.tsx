import React, { useActionState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, beforeEach, expect } from 'vitest';

import { EditProfile } from './EditProfile';
import { ProfileType } from '@/schema';

const mockFormAction = vi.fn();
const mockFormState = { success: false };

vi.mock('react', async () => {
    const originalModule = await vi.importActual('react');
    return {
        ...originalModule,
        useActionState: vi.fn(() => [mockFormState, mockFormAction, false]),
    };
});

describe('EditProfile', () => {
    const defaultProfile: ProfileType = {
        public: true,
        userName: 'TestUser',
        bio: 'Hello world',
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders form fields with default values', () => {
        render(<EditProfile profile={defaultProfile} />);

        expect(screen.getByLabelText(/public/i)).toBeInTheDocument();
        expect(screen.getByText(/user name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/bio/i)).toHaveValue('Hello world');
    });

    it('calls updateProfile with form data when submitted', async () => {
        render(<EditProfile profile={defaultProfile} />);

        await userEvent.type(screen.getByLabelText(/username/i), 'NewUser');

        await userEvent.click(
            screen.getByRole('button', { name: /update profile/i }),
        );

        expect(useActionState).toHaveBeenCalled();
        expect(mockFormAction).toHaveBeenCalled();
    });
});
