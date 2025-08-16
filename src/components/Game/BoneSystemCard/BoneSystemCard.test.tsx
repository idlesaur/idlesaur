import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useGameState, useGameStateDispatch } from '@/state/hooks';
import { getBoneDiggerCost } from '@/util';
import { purchaseBoneDiggers } from '@/state/actions';
import { BoneSystemCard } from '@/components/Game';
import { createGameState } from '@/state/util';

vi.mock('@/components/Game', async () => {
    const originalModule = await vi.importActual('@/components/Game');
    return { ...originalModule, BoneButton: () => <div>MockBoneButton</div> };
});

vi.mock('@/state/hooks', () => ({
    useGameState: vi.fn(),
    useGameStateDispatch: vi.fn(),
}));

vi.mock('@/util', async () => {
    const originalModule = await vi.importActual('@/util');

    return { ...originalModule, getBoneDiggerCost: vi.fn() };
});

vi.mock('@/state/actions', () => ({
    purchaseBoneDiggers: vi.fn(),
}));

describe('<BoneSystemCard />', () => {
    it('renders bone stats and calls dispatch on purchase if affordable', async () => {
        const mockDispatch = vi.fn();
        const mockBones = 100;
        const mockBoneDiggers = 2;
        const mockCost = 50;
        const mockBonesPerSecond = mockBoneDiggers;

        vi.mocked(useGameState).mockReturnValue(
            createGameState({
                bones: mockBones,
                boneDiggers: mockBoneDiggers,
            }),
        );

        vi.mocked(useGameStateDispatch).mockReturnValue(mockDispatch);
        vi.mocked(getBoneDiggerCost).mockReturnValue(mockCost);
        vi.mocked(purchaseBoneDiggers).mockReturnValue({
            type: 'game_state/purchase_bone_digger',
            payload: 1,
        });

        render(<BoneSystemCard />);

        // Text assertions
        expect(screen.getByText(/Bones:/)).toHaveTextContent(
            `Bones: ${mockBones}`,
        );
        expect(screen.getByText(/Bone-diggers:/)).toHaveTextContent(
            `Bone-diggers: ${mockBoneDiggers} (${mockBonesPerSecond} bones/ sec)`,
        );

        // BoneButton
        expect(screen.getByText('MockBoneButton')).toBeInTheDocument();

        // Buy button click
        const buyButton = screen.getByRole('button', {
            name: /buy bone-digger/i,
        });
        expect(buyButton).not.toBeDisabled();

        await userEvent.click(buyButton);
        expect(mockDispatch).toHaveBeenCalledWith({
            type: 'game_state/purchase_bone_digger',
            payload: 1,
        });
    });

    it('disables buy button if not enough bones', () => {
        vi.mocked(useGameState).mockReturnValue(
            createGameState({
                bones: 10,
                boneDiggers: 2,
            }),
        );

        vi.mocked(useGameStateDispatch).mockReturnValue(vi.fn());
        vi.mocked(getBoneDiggerCost).mockReturnValue(50);

        render(<BoneSystemCard />);

        const buyButton = screen.getByRole('button', {
            name: /buy bone-digger/i,
        });
        expect(buyButton).toBeDisabled();
    });

    // it("renders bone stats and does not dispatch on purchase if can't affordable", async () => {
    //     const mockDispatch = vi.fn();
    //     const mockBones = 42;
    //     const mockCost = 50;
    //
    //     vi.mocked(useGameState).mockReturnValue(
    //         createGameState({
    //             bones: mockBones,
    //         }),
    //     );
    //
    //     vi.mocked(useGameStateDispatch).mockReturnValue(mockDispatch);
    //     vi.mocked(getBoneDiggerCost).mockReturnValue(mockCost);
    //     vi.mocked(purchaseBoneDiggers).mockReturnValue({
    //         type: 'game_state/purchase_bone_digger',
    //         payload: 1,
    //     });
    //
    //     render(<BoneSystemCard />);
    //
    //     // Text assertions
    //     expect(screen.getByText(/Bones:/)).toHaveTextContent(
    //         `Bones: ${mockBones}`,
    //     );
    //
    //     // BoneButton
    //     expect(screen.getByText('MockBoneButton')).toBeInTheDocument();
    //
    //     // Buy button click
    //     const buyButton = screen.getByRole('button', {
    //         name: /buy bone-digger/i,
    //     });
    //     expect(buyButton).toBeDisabled();
    //
    //     await userEvent.click(buyButton);
    //     expect(mockDispatch).not.toHaveBeenCalled();
    // });
});
