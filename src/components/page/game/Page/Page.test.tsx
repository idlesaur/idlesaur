import { screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { mockUseDinosaursStore } from '@/test/mockUseDinosaursStore';
import { Page } from '@/components/page/game';
import { useDinosaursStore } from '@/state/providers';
import { mockDinosaur } from '@/test/mockFactory';
import { getRender } from '@/test/util';

vi.mock('@/state/providers', { spy: true });

describe('<Page />', () => {
    const mockUseDinosaursStoreInstance = vi.mocked(useDinosaursStore);

    const mockBuyBoneDiggersAction = vi.fn();
    const mockDigAction = vi.fn();
    const mockBuyDinoAction = vi.fn();
    const mockBuyDinosaurCapacityUpgradeAction = vi.fn();
    const mockRenameDinosaurAction = vi.fn();

    const render = getRender();

    beforeEach(() => {
        vi.clearAllMocks();
        mockUseDinosaursStore(mockUseDinosaursStoreInstance);
    });

    it('renders correctly when a dinosaur is selected', () => {
        const name = 'test dino';
        mockUseDinosaursStore(mockUseDinosaursStoreInstance, {
            selectedDinosaur: mockDinosaur({ name }),
        });

        render(
            <Page
                buyBoneDiggersAction={mockBuyBoneDiggersAction}
                digAction={mockDigAction}
                buyDinoAction={mockBuyDinoAction}
                renameDinosaurAction={mockRenameDinosaurAction}
                buyDinosaurCapacityUpgradeAction={
                    mockBuyDinosaurCapacityUpgradeAction
                }
            />,
        );
        expect(screen.getByText(name)).toBeInTheDocument();
    });
});
