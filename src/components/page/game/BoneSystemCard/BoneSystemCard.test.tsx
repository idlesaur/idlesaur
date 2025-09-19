import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React, { useActionState } from 'react';

import { BoneSystemCard } from '@/components/page/game';
import { useCurrencyStore, useUpgradesStore } from '@/state/providers';
import { getBoneDiggerCost } from '@/util';
import { BASE_BONES_PER_SECOND_PER_DIGGER } from '@/constants';
import {
    mockSetBones,
    mockUseCurrencyStore,
    mockUseUpgradesStore,
} from '@/test/mockFactory';

vi.mock('@/state/providers', { spy: true });

vi.mock('@/util', async () => {
    const originalModule = await vi.importActual('@/util');
    return { ...originalModule, getBoneDiggerCost: vi.fn() };
});

vi.mock('react', async () => {
    const actualReact = await vi.importActual<typeof import('react')>('react');
    return {
        ...actualReact,
        useActionState: vi.fn(),
    };
});

describe('<BoneSystemCard />', () => {
    const mockUseCurrencyStoreInstance = vi.mocked(useCurrencyStore);
    const mockUseUpgradesStoreInstance = vi.mocked(useUpgradesStore);

    const mockUseActionState = vi.mocked(useActionState);
    const mockBuyBoneDiggersAction = vi.fn();
    const mockDigAction = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        mockUseCurrencyStore(mockUseCurrencyStoreInstance, { bones: 1000 });
        mockUseUpgradesStore(mockUseUpgradesStoreInstance, { boneDiggers: 2 });
        vi.mocked(getBoneDiggerCost).mockReturnValue(50);
    });

    const doRender = () =>
        render(
            <BoneSystemCard
                buyBoneDiggersAction={mockBuyBoneDiggersAction}
                digAction={mockDigAction}
            />,
        );

    it('renders bone stats correctly', () => {
        mockUseActionState.mockReturnValue([
            { success: false },
            vi.fn(),
            false,
        ]);

        doRender();

        expect(screen.getByText(/Bones:/)).toHaveTextContent('Bones: 1,000');
        expect(screen.getByText(/Bone-diggers:/)).toHaveTextContent(
            `Bone-diggers: 2 (${2 * BASE_BONES_PER_SECOND_PER_DIGGER} bones/ sec)`,
        );
        expect(screen.getByText('Dig for bones')).toBeInTheDocument();
    });

    it('disables buy button when not affordable', () => {
        mockUseCurrencyStore(mockUseCurrencyStoreInstance, { bones: 0 });
        mockUseActionState.mockReturnValue([
            { success: false },
            vi.fn(),
            false,
        ]);

        doRender();

        const btn = screen.getByRole('button', {
            name: /50 Buy 1 Bone-digger/i,
        });
        expect(btn).toBeDisabled();
    });

    it('disables buy button when pending', () => {
        mockUseActionState.mockReturnValue([{ success: false }, vi.fn(), true]);

        doRender();

        const btn = screen.getByRole('button', { name: /Loading.../i });
        expect(btn).toBeDisabled();
    });

    it('dispatches updated bones and diggers when state changes', () => {
        const newState = { bones: 150, boneDiggers: 5 };
        mockUseActionState.mockReturnValue([newState, vi.fn(), false]);

        doRender();

        expect(mockSetBones).toHaveBeenCalledWith(newState.bones);
    });

    it('updates buy amount when slider changes', () => {
        mockUseActionState.mockReturnValue([
            { success: false },
            vi.fn(),
            false,
        ]);

        doRender();

        const slider = screen.getByRole('slider');
        fireEvent.change(slider, { target: { value: '5' } });

        expect(
            screen.getByRole('button', { name: /buy 5 bone-diggers/i }),
        ).toBeInTheDocument();
    });
});
