import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DinoSystemCard } from '@/components/page/game';
import { getDinoCost, getDinoCapacityIncreaseCost } from '@/util';
import { BuyDinoState, BuyDinosaurCapacityUpgradeState } from '@/app/lib/types';
import { createDino } from '@/app/lib/util';
import { $Enums } from '@/generated/prisma';

// ---- mocks ----
vi.mock('react', async () => {
    const actual = await vi.importActual<typeof import('react')>('react');
    return {
        ...actual,
        useActionState: vi.fn(),
    };
});

vi.mock('@/state/providers', () => ({
    useCurrencyStore: vi.fn(),
    useDinosaursStore: vi.fn(),
    useUpgradesStore: vi.fn(),
}));

vi.mock('@/util', async () => {
    const original = await vi.importActual<typeof import('@/util')>('@/util');
    return {
        ...original,
        getDinoCost: vi.fn(),
        getDinoCapacityIncreaseCost: vi.fn(),
        formatNumber: (n: number) => String(n),
    };
});

vi.mock('@/app/lib/actions', { spy: true });

// ---- setup helpers ----
const mockUseCurrencyStore = vi.mocked(
    await import('@/state/providers').then((m) => m.useCurrencyStore),
);
const mockUseDinosaursStore = vi.mocked(
    await import('@/state/providers').then((m) => m.useDinosaursStore),
);
const mockUseUpgradesStore = vi.mocked(
    await import('@/state/providers').then((m) => m.useUpgradesStore),
);
const mockUseActionState = vi.mocked(
    await import('react').then((m) => m.useActionState),
);

describe('<DinoSystemCard />', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const setupStores = ({
        bones = 100,
        dinosaurs = [],
        dinosaurCapacity = 5,
    } = {}) => {
        mockUseCurrencyStore.mockReturnValue({
            bones,
            setBones: vi.fn(),
        });
        mockUseDinosaursStore.mockReturnValue({
            dinosaurs,
            addDinosaur: vi.fn(),
        });
        mockUseUpgradesStore.mockReturnValue({
            dinosaurCapacity,
            setDinosaurCapacity: vi.fn(),
        });
    };

    const setupActionStates = ({
        dinoFormState,
        dinoCapacityFormState,
    }: {
        dinoFormState?: BuyDinoState;
        dinoCapacityFormState?: BuyDinosaurCapacityUpgradeState;
    } = {}) => {
        const dinoFormAction = vi.fn();
        const capacityFormAction = vi.fn();
        mockUseActionState
            .mockReturnValueOnce([
                dinoFormState ?? { success: false },
                dinoFormAction,
                false,
            ]) // first call: buyDino
            .mockReturnValueOnce([
                dinoCapacityFormState ?? { success: false },
                capacityFormAction,
                false,
            ]); // second call: capacity
        return { dinoFormAction, capacityFormAction };
    };

    it('renders and enables buy dinosaur button when affordable and capacity available', async () => {
        setupStores({ bones: 100, dinosaurs: [], dinosaurCapacity: 5 });
        vi.mocked(getDinoCost).mockReturnValue(50);
        vi.mocked(getDinoCapacityIncreaseCost).mockReturnValue(200);

        const { dinoFormAction } = setupActionStates();

        render(<DinoSystemCard />);

        const buildButton = screen.getByRole('button', {
            name: /build dinosaur/i,
        });
        expect(buildButton).toBeEnabled();

        await userEvent.click(buildButton);
        expect(dinoFormAction).toHaveBeenCalled();
    });

    it('disables buy dinosaur button if not enough bones', () => {
        setupStores({ bones: 10, dinosaurs: [], dinosaurCapacity: 5 });
        vi.mocked(getDinoCost).mockReturnValue(50);
        vi.mocked(getDinoCapacityIncreaseCost).mockReturnValue(200);

        setupActionStates();

        render(<DinoSystemCard />);

        const buildButton = screen.getByRole('button', {
            name: /build dinosaur/i,
        });
        expect(buildButton).toBeDisabled();
    });

    it('updates currency and dinosaurs when buyDinoFormState.success is true', () => {
        const setBones = vi.fn();
        const addDinosaur = vi.fn();

        mockUseCurrencyStore.mockReturnValue({ bones: 100, setBones });
        mockUseDinosaursStore.mockReturnValue({ dinosaurs: [], addDinosaur });
        mockUseUpgradesStore.mockReturnValue({
            dinosaurCapacity: 5,
            setDinosaurCapacity: vi.fn(),
        });

        vi.mocked(getDinoCost).mockReturnValue(50);
        vi.mocked(getDinoCapacityIncreaseCost).mockReturnValue(200);

        setupActionStates({
            dinoFormState: {
                success: true,
                bones: 42,
                // @ts-expect-error create input vs generated model
                dino: {
                    ...createDino(),
                    userId: 'testId',
                    type: $Enums.DinoType.RAPTOR,
                    id: 'test123',
                },
            },
        });

        render(<DinoSystemCard />);

        expect(setBones).toHaveBeenCalledWith(42);
        expect(addDinosaur).toHaveBeenCalledWith(
            expect.objectContaining({
                id: 'test123',
                level: 1,
                userId: 'testId',
                type: $Enums.DinoType.RAPTOR,
            }),
        );
    });

    it('updates currency and capacity when buyDinoCapacityFormState.success is true', () => {
        const setBones = vi.fn();
        const setDinosaurCapacity = vi.fn();

        mockUseCurrencyStore.mockReturnValue({ bones: 100, setBones });
        mockUseDinosaursStore.mockReturnValue({
            dinosaurs: [],
            addDinosaur: vi.fn(),
        });
        mockUseUpgradesStore.mockReturnValue({
            dinosaurCapacity: 5,
            setDinosaurCapacity,
        });

        vi.mocked(getDinoCost).mockReturnValue(50);
        vi.mocked(getDinoCapacityIncreaseCost).mockReturnValue(200);

        setupActionStates({
            dinoCapacityFormState: {
                success: true,
                bones: 75,
                dinosaurCapacity: 10,
            },
        });

        render(<DinoSystemCard />);

        expect(setBones).toHaveBeenCalledWith(75);
        expect(setDinosaurCapacity).toHaveBeenCalledWith(10);
    });

    it('enables capacity upgrade button when enough bones', async () => {
        setupStores({ bones: 300, dinosaurs: [], dinosaurCapacity: 5 });
        vi.mocked(getDinoCost).mockReturnValue(50);
        vi.mocked(getDinoCapacityIncreaseCost).mockReturnValue(200);

        const { capacityFormAction } = setupActionStates();

        render(<DinoSystemCard />);

        const capacityButton = screen.getByRole('button', {
            name: /increase dinosaur capacity/i,
        });
        expect(capacityButton).toBeEnabled();

        await userEvent.click(capacityButton);
        expect(capacityFormAction).toHaveBeenCalled();
    });
});
