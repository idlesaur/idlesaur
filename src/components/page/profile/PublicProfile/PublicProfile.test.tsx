import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi, describe, it, beforeEach, expect } from 'vitest';

import { PublicProfile } from '@/components/page/profile';
import { mockProfile } from '@/test/mockFactory';

const mockFormAction = vi.fn();
const mockFormState = { success: false };

vi.mock('react', async () => {
    const originalModule = await vi.importActual('react');
    return {
        ...originalModule,
        useActionState: vi.fn(() => [mockFormState, mockFormAction, false]),
    };
});

describe('PublicProfile', () => {
    const defaultProfile = mockProfile();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders default public profile', () => {
        render(<PublicProfile profile={defaultProfile} />);

        expect(screen.getByText(/tester/i)).toBeInTheDocument();
        expect(screen.getByText(/Last active: /i)).toBeInTheDocument();
    });
});
