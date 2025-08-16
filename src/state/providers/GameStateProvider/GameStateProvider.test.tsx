import React, { useContext } from 'react';
import { screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { GameStateProvider } from '@/state/providers';
import { GameStateContext } from '@/state/context';
import { render } from '@/test/util';

vi.mock('@/components', () => ({
    LoadingIndicator: () => <div data-testid="loading" />,
}));

vi.mock('next-auth/react', async () => {
    const original = await vi.importActual('next-auth/react');
    return {
        ...original,
        useSession: () => ({
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
        render(
            <GameStateProvider>
                <div>Child content</div>
            </GameStateProvider>,
        );

        expect(screen.getByTestId('loading')).toBeInTheDocument();
        expect(screen.queryByText('Child content')).not.toBeInTheDocument();
    });

    it('renders children after hydration', async () => {
        render(
            <GameStateProvider>
                <div>Child content</div>
            </GameStateProvider>,
        );

        await waitFor(() =>
            expect(screen.queryByTestId('loading')).not.toBeInTheDocument(),
        );

        expect(screen.getByText('Child content')).toBeInTheDocument();
    });

    it('provides context to children', async () => {
        render(
            <GameStateProvider>
                <TestConsumer />
            </GameStateProvider>,
        );

        await waitFor(() =>
            expect(screen.getByText(/bones: 123/i)).toBeInTheDocument(),
        );
    });
});
