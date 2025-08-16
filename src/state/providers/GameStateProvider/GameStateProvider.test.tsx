import React, { useContext } from 'react';
import { screen } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { useLocalStorageState } from '@/hooks';
import { GameStateProvider } from '@/state/providers';
import { GameStateContext } from '@/state/context';
import { render } from '@/test/util';
import * as nextAuth from 'next-auth/react';

vi.mock('@/hooks/useLocalStorageState', { spy: true });

vi.mock('@/components', () => ({
    LoadingIndicator: () => <div data-testid="loading" />,
}));

// Partial mock
vi.mock('next-auth/react', async () => {
    const original: typeof nextAuth = await vi.importActual('next-auth/react');
    return {
        ...original, // keep everything else, including SessionProvider
        useSession: () => ({
            // mock useSession
            data: null,
            status: 'loading',
        }),
    };
});

describe('GameStateProvider', () => {
    const TestConsumer = () => {
        const state = useContext(GameStateContext);
        return <div>bones: {state?.bones}</div>;
    };

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('shows loading if not hydrated', () => {
        vi.mocked(useLocalStorageState).mockReturnValue([
            { bones: 0 },
            vi.fn(),
            false,
        ]);
        render(
            <GameStateProvider>
                <div>Child content</div>
            </GameStateProvider>,
        );

        expect(screen.getByTestId('loading')).toBeInTheDocument();
        expect(screen.queryByText('Child content')).not.toBeInTheDocument();
    });

    it('renders children after hydration', () => {
        vi.mocked(useLocalStorageState).mockReturnValue([
            { bones: 0 },
            vi.fn(),
            true,
        ]);
        render(
            <GameStateProvider>
                <div>Child content</div>
            </GameStateProvider>,
        );

        expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
        expect(screen.getByText('Child content')).toBeInTheDocument();
    });

    it('provides context to children', () => {
        const setLocalStorageState = vi.fn();
        vi.mocked(useLocalStorageState).mockReturnValue([
            { bones: 123 },
            setLocalStorageState,
            true,
        ]);

        render(
            <GameStateProvider>
                <TestConsumer />
            </GameStateProvider>,
        );

        expect(screen.getByText('bones: 123')).toBeInTheDocument();
    });
});
