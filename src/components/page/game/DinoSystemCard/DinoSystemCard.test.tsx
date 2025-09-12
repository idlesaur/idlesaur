import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DinoSystemCard } from '@/components/page/game';
import { getDinoCost } from '@/util';

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
}));

vi.mock('@/util', async () => {
    const original = await vi.importActual<typeof import('@/util')>('@/util');
    return {
        ...original,
        getDinoCost: vi.fn(),
        formatNumber: (n: number) => String(n),
    };
});

vi.mock('@/app/lib/actions', () => ({
    buyDino: vi.fn(),
}));

// ---- setup helpers ----
const mockUseCurrencyStore = vi.mocked(
    await import('@/state/providers').then((m) => m.useCurrencyStore),
);
const mockUseDinosaursStore = vi.mocked(
    await import('@/state/providers').then((m) => m.useDinosaursStore),
);
const mockUseActionState = vi.mocked(
    await import('react').then((m) => m.useActionState),
);

describe('<DinoSystemCard />', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders and enables buy button when affordable', async () => {
        mockUseCurrencyStore.mockReturnValue({
            bones: 100,
            setBones: vi.fn(),
        });
        mockUseDinosaursStore.mockReturnValue({
            dinosaurs: [],
        });
        vi.mocked(getDinoCost).mockReturnValue(50);

        const formAction = vi.fn();
        mockUseActionState.mockReturnValue([
            { success: false }, // formState
            formAction,
            false, // isPending
        ]);

        render(<DinoSystemCard />);

        const buildButton = screen.getByRole('button', {
            name: /build dinosaur/i,
        });
        expect(buildButton).toBeEnabled();

        await userEvent.click(buildButton);

        // The <form> calls formAction on submit
        expect(formAction).toHaveBeenCalled();
    });

    it('updates currency store when formState.success is true', () => {
        const setBones = vi.fn();
        mockUseCurrencyStore.mockReturnValue({
            bones: 100,
            setBones,
        });
        mockUseDinosaursStore.mockReturnValue({
            dinosaurs: [],
        });
        vi.mocked(getDinoCost).mockReturnValue(50);

        const formAction = vi.fn();
        mockUseActionState.mockReturnValue([
            { success: true, bones: 42 }, // formState with success
            formAction,
            false,
        ]);

        render(<DinoSystemCard />);

        // because useEffect runs immediately after render when success=true
        expect(setBones).toHaveBeenCalledWith(42);
    });

    it('disables buy button if not enough bones', () => {
        mockUseCurrencyStore.mockReturnValue({
            bones: 10,
            setBones: vi.fn(),
        });
        mockUseDinosaursStore.mockReturnValue({
            dinosaurs: [],
        });
        vi.mocked(getDinoCost).mockReturnValue(50);

        const formAction = vi.fn();
        mockUseActionState.mockReturnValue([
            { success: false },
            formAction,
            false,
        ]);

        render(<DinoSystemCard />);

        const buildButton = screen.getByRole('button', {
            name: /build dinosaur/i,
        });
        expect(buildButton).toBeDisabled();
    });
});
