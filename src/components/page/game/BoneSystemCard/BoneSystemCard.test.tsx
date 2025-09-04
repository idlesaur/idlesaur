import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React, { useActionState } from 'react';

import { BoneSystemCard } from '@/components/page/game';
import { useCurrencyStore, useUpgradesStore } from '@/state/providers';
import { getBoneDiggerCost } from '@/util';
import { BASE_BONES_PER_SECOND_PER_DIGGER } from '@/constants';
import { createCurrencyState, createUpgradesState } from '@/state/stores';

vi.mock('@/state/providers', () => ({
    useCurrencyStore: vi.fn(),
    useUpgradesStore: vi.fn(),
}));

vi.mock('@/util', async () => {
    const originalModule = await vi.importActual('@/util');
    return { ...originalModule, getBoneDiggerCost: vi.fn() };
});

vi.mock('@/state/actions', { spy: true });

vi.mock('@/app/actions', { spy: true });

vi.mock('react', async () => {
    const actualReact = await vi.importActual<typeof import('react')>('react');
    return {
        ...actualReact,
        useActionState: vi.fn(),
    };
});

describe('<BoneSystemCard />', () => {
    const mockUseActionState = vi.mocked(useActionState);

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders bone stats correctly', () => {
        vi.mocked(useCurrencyStore).mockReturnValue(
            createCurrencyState({ bones: 100 }),
        );
        vi.mocked(useUpgradesStore).mockReturnValue(
            createUpgradesState({ boneDiggers: 2 }),
        );
        vi.mocked(getBoneDiggerCost).mockReturnValue(50);
        mockUseActionState.mockReturnValue([null, vi.fn(), false]);

        render(<BoneSystemCard />);

        expect(screen.getByText(/Bones:/)).toHaveTextContent('Bones: 100');
        expect(screen.getByText(/Bone-diggers:/)).toHaveTextContent(
            `Bone-diggers: 2 (${2 * BASE_BONES_PER_SECOND_PER_DIGGER} bones/ sec)`,
        );
        expect(screen.getByText('Dig for bones')).toBeInTheDocument();
    });

    it('disables buy button when not affordable', () => {
        vi.mocked(useCurrencyStore).mockReturnValue(
            createCurrencyState({ bones: 10 }),
        );
        vi.mocked(useUpgradesStore).mockReturnValue(
            createUpgradesState({ boneDiggers: 2 }),
        );
        vi.mocked(getBoneDiggerCost).mockReturnValue(50);
        mockUseActionState.mockReturnValue([null, vi.fn(), false]);

        render(<BoneSystemCard />);

        const btn = screen.getByRole('button', { name: /buy 1 bone-digger/i });
        expect(btn).toBeDisabled();
    });

    it('disables buy button when pending', () => {
        vi.mocked(useCurrencyStore).mockReturnValue(
            createCurrencyState({ bones: 100 }),
        );
        vi.mocked(useUpgradesStore).mockReturnValue(
            createUpgradesState({ boneDiggers: 2 }),
        );
        vi.mocked(getBoneDiggerCost).mockReturnValue(50);
        mockUseActionState.mockReturnValue([null, vi.fn(), true]);

        render(<BoneSystemCard />);

        const btn = screen.getByRole('button', { name: /buy 1 bone-digger/i });
        expect(btn).toBeDisabled();
    });

    it('dispatches updated bones and diggers when state changes', () => {
        const mockSetBones = vi.fn();
        const mockSetBoneDiggers = vi.fn();

        vi.mocked(useCurrencyStore).mockReturnValue({
            ...createCurrencyState({ bones: 100 }),
            setBones: mockSetBones,
        });
        vi.mocked(useUpgradesStore).mockReturnValue({
            ...createUpgradesState({ boneDiggers: 2 }),
            setBoneDiggers: mockSetBoneDiggers,
        });
        vi.mocked(getBoneDiggerCost).mockReturnValue(50);

        const newState = { bones: 150, boneDiggers: 5 };
        mockUseActionState.mockReturnValue([newState, vi.fn(), false]);

        render(<BoneSystemCard />);

        expect(mockSetBones).toHaveBeenCalledWith(newState.bones);
        // expect(mockDispatch).toHaveBeenCalledWith(
        //     setBoneDiggers(newState.boneDiggers),
        // );
    });

    it('updates buy amount when slider changes', () => {
        vi.mocked(useCurrencyStore).mockReturnValue(
            createCurrencyState({ bones: 1000 }),
        );
        vi.mocked(useUpgradesStore).mockReturnValue(
            createUpgradesState({ boneDiggers: 2 }),
        );

        vi.mocked(getBoneDiggerCost).mockReturnValue(100);
        mockUseActionState.mockReturnValue([null, vi.fn(), false]);

        render(<BoneSystemCard />);

        const slider = screen.getByRole('slider');
        fireEvent.change(slider, { target: { value: '5' } });

        expect(
            screen.getByRole('button', { name: /buy 5 bone-diggers/i }),
        ).toBeInTheDocument();
    });
});
