import React, { useActionState } from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, beforeEach, expect } from 'vitest';
import { render } from '@/test/util';
import { useToastsStore } from '@/state/providers';

import { EditProfile } from './EditProfile';
import { ProfileType } from '@/schema';
import { ToastsStore } from '@/state/stores';

vi.mock('@/state/providers', { spy: true });
vi.mock('react', { spy: true });

describe('EditProfile', () => {
    const defaultProfile: ProfileType = {
        public: true,
        userName: 'TestUser',
        bio: 'Hello world',
    };

    const mockFormAction = vi.fn();
    const mockAddSuccessToast = vi.fn();
    const mockAddErrorToast = vi.fn();
    const mockFormState = { success: false };
    const mockToastStore: Partial<ToastsStore> = {
        addSuccessToast: mockAddSuccessToast,
        addErrorToast: mockAddErrorToast,
    };

    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(useActionState).mockReturnValue([
            mockFormState,
            mockFormAction,
            false,
        ]);
        vi.mocked(useToastsStore).mockImplementation((selectorFn) =>
            selectorFn(mockToastStore as ToastsStore),
        );
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

    it('addSuccessToast with successful formstate', async () => {
        vi.mocked(useActionState).mockReturnValue([
            { success: true, message: 'hi' },
            mockFormAction,
            false,
        ]);

        render(<EditProfile profile={defaultProfile} />);

        await userEvent.type(screen.getByLabelText(/username/i), 'NewUser');

        await userEvent.click(
            screen.getByRole('button', { name: /update profile/i }),
        );

        expect(useActionState).toHaveBeenCalled();
        expect(mockFormAction).toHaveBeenCalled();
        expect(mockAddErrorToast).not.toHaveBeenCalled();
        expect(mockAddSuccessToast).toHaveBeenCalled();
    });

    it('addErrorToast with successful formstate', async () => {
        vi.mocked(useActionState).mockReturnValue([
            { success: false, message: 'hi' },
            mockFormAction,
            false,
        ]);

        render(<EditProfile profile={defaultProfile} />);

        await userEvent.type(screen.getByLabelText(/username/i), 'NewUser');

        await userEvent.click(
            screen.getByRole('button', { name: /update profile/i }),
        );

        expect(useActionState).toHaveBeenCalled();
        expect(mockFormAction).toHaveBeenCalled();
        expect(mockAddErrorToast).toHaveBeenCalled();
        expect(mockAddSuccessToast).not.toHaveBeenCalled();
    });
});
