import React, { useActionState } from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { getRender, WrapperOptions } from '@/test/util';

import { BoneButton } from './BoneButton';
import { useCurrencyStore } from '@/state/providers';

vi.mock('@/state/providers', { spy: true });
vi.mock('react', { spy: true });

describe('BoneButton', () => {
    const mockAction = vi.fn();
    const mockDigAction = vi.fn();
    const mockSetBones = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(useCurrencyStore).mockReturnValue(mockSetBones);
    });

    const doRender = (wrapper: WrapperOptions = {}) => {
        const render = getRender(wrapper);
        const { rerender } = render(<BoneButton digAction={mockDigAction} />);

        return () => rerender(<BoneButton digAction={mockDigAction} />);
    };

    it('renders the BoneButton with correct text', () => {
        doRender();
        expect(screen.getByText('Dig for bones')).toBeInTheDocument();
    });

    it('calls mockDigAction with the action on click', async () => {
        doRender();
        expect(mockDigAction).not.toHaveBeenCalled();
        await userEvent.click(screen.getByText('Dig for bones'));
        expect(mockDigAction).toHaveBeenCalled();
    });

    it('setBones when state.bones changes', () => {
        vi.mocked(useActionState).mockReturnValueOnce([
            { bones: 2 },
            mockAction,
            false,
        ]);
        vi.mocked(useActionState).mockReturnValueOnce([
            { bones: 42 },
            mockAction,
            false,
        ]);
        const rerender = doRender();
        expect(mockSetBones).toHaveBeenCalledWith(2);

        rerender();
        expect(mockSetBones).toHaveBeenCalledWith(42);
    });

    it('does not dispatch when state.bones is missing', () => {
        vi.mocked(useActionState).mockReturnValue([{}, mockAction, false]);
        doRender();
        expect(mockSetBones).not.toHaveBeenCalled();
    });

    it('disables button when pending is true', () => {
        vi.mocked(useActionState).mockReturnValue([null, mockAction, true]);
        doRender();
        expect(
            screen.getByText('Dig for bones').parentNode?.parentNode,
        ).toBeDisabled();
    });
});
