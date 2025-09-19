import React from 'react';
import { act } from '@testing-library/react';
import {
    expect,
    it,
    vi,
    describe,
    afterEach,
    beforeEach,
    beforeAll,
    afterAll,
} from 'vitest';
import { useInterval } from '@/hooks';
import { render, getRender } from '@/test/util';
import { GameTick } from '@/components/page/game';
import { useCurrencyStore } from '@/state/providers';
import { CurrencyStore } from '@/state/stores';

vi.mock('@/hooks/useInterval', { spy: true });
vi.mock('@/state/hooks/useGameStateDispatch', { spy: true });
vi.mock('@/state/providers', { spy: true });

describe('GameTick', () => {
    const mockSetBones = vi.fn();
    const mockCurrencyStore: Partial<CurrencyStore> = {
        bones: 42,
        setBones: mockSetBones,
    };

    beforeAll(() => {
        vi.useFakeTimers();
    });

    beforeEach(() => {
        vi.mocked(useCurrencyStore).mockImplementation((selectorFn) =>
            selectorFn(mockCurrencyStore as CurrencyStore),
        );
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    afterAll(() => {
        vi.useRealTimers();
    });

    it('calls useInterval once for a simulated game tick and does not add bones if added == 0', () => {
        render(<GameTick />);

        expect(useInterval).toHaveBeenCalled();
        expect(mockSetBones).not.toHaveBeenCalled();

        // Simulate a gametick
        act(() => {
            vi.advanceTimersToNextTimer();
        });

        expect(mockSetBones).not.toHaveBeenCalled();
    });

    it('adds bones based on bone diggers', () => {
        const renderWithState = getRender({
            upgradesState: { boneDiggers: 1 },
        });
        renderWithState(<GameTick />);

        expect(useInterval).toHaveBeenCalled();
        expect(mockSetBones).not.toHaveBeenCalled();

        // Simulate a game tick
        act(() => {
            vi.advanceTimersToNextTimer();
        });

        expect(mockSetBones).toHaveBeenCalledWith(42.066);
    });
});
