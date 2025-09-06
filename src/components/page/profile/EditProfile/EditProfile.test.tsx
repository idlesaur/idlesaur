import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, beforeEach, expect } from 'vitest';

import { EditProfile, EditProfileProps } from './EditProfile';
import { updateProfile } from '@/app/lib/actions';
import { ButtonProps, FormFieldProps, FormProps } from '@/components/ui';
import { ProfileType } from '@/schema';

vi.mock('@/app/lib/actions', () => ({
    updateProfile: vi.fn(),
}));

// Mock UI components so they just render children and props
vi.mock('@/components/ui', () => ({
    Card: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="card">{children}</div>
    ),
    CardHeading: ({ children }: { children: React.ReactNode }) => (
        <h1>{children}</h1>
    ),
    Form: ({ children, onSubmit }: Partial<FormProps<ProfileType>>) => (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                if (onSubmit) {
                    onSubmit(
                        { success: false },
                        {
                            // @ts-expect-error FormData
                            userName: 'NewUser',
                            bio: 'Hello world',
                            public: true,
                        },
                    );
                }
            }}
        >
            {typeof children === 'function'
                ? children({
                      isPending: false,
                      formState: { success: true },
                  })
                : children}
        </form>
    ),

    FormField: ({
        label,
        type = 'text',
        error,
        register,
    }: FormFieldProps<ProfileType>) => (
        <div>
            <label>
                {label}
                <input type={type} {...register(label)} aria-label={label} />
            </label>
            {error && <span role="alert">{error}</span>}
        </div>
    ),
    Button: ({ children, ...props }: ButtonProps) => (
        <button {...props}>{children}</button>
    ),
}));

describe('EditProfile', () => {
    const defaultProfile: EditProfileProps['profile'] = {
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
        expect(screen.getByLabelText(/username/i)).toHaveValue('TestUser');
        expect(screen.getByLabelText(/bio/i)).toHaveValue('Hello world');
    });

    it('calls updateProfile with form data when submitted', async () => {
        render(<EditProfile profile={defaultProfile} />);

        fireEvent.change(screen.getByLabelText(/username/i), {
            target: { value: 'NewUser' },
        });

        fireEvent.submit(
            screen.getByRole('button', { name: /update profile/i }),
        );

        await waitFor(() => {
            expect(updateProfile).toHaveBeenCalled();
        });
    });
});
