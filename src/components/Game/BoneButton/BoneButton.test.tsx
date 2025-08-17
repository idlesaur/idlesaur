import React, { useActionState, startTransition } from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { render } from '@/test/util';

import { BoneButton } from './BoneButton';
import { setBones } from '@/state/actions';
import { useGameStateDispatch } from '@/state/hooks';

vi.mock('@/state/hooks', () => ({
    useGameStateDispatch: vi.fn(),
}));

vi.mock(import('react'), async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        useActionState: vi.fn(),
        startTransition: vi.fn(),
    };
});

vi.mock('@/app/actions', { spy: true });

describe('BoneButton', () => {
    const mockDispatch = vi.fn();
    const mockAction = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(useGameStateDispatch).mockReturnValue(mockDispatch);
        vi.mocked(useActionState).mockReturnValue([null, mockAction, false]);
    });

    it('renders the BoneButton with correct text', () => {
        render(<BoneButton />);
        expect(screen.getByText('Dig for bones')).toBeInTheDocument();
    });

    it('calls startTransition with the action on click', async () => {
        render(<BoneButton />);
        await userEvent.click(screen.getByText('Dig for bones'));
        expect(startTransition).toHaveBeenCalledWith(mockAction);
    });

    it('dispatches setBones when state.bones changes', () => {
        vi.mocked(useActionState).mockReturnValue([
            { bones: 42 },
            mockAction,
            false,
        ]);
        render(<BoneButton />);
        expect(mockDispatch).toHaveBeenCalledWith(setBones(42));
    });

    it('does not dispatch when state.bones is missing', () => {
        vi.mocked(useActionState).mockReturnValue([{}, mockAction, false]);
        render(<BoneButton />);
        expect(mockDispatch).not.toHaveBeenCalled();
    });

    it('disables button when pending is true', () => {
        vi.mocked(useActionState).mockReturnValue([null, mockAction, true]);
        render(<BoneButton />);
        expect(
            screen.getByText('Dig for bones').parentNode?.parentNode,
        ).toBeDisabled();
    });
});
