import React, { useContext } from 'react';
import { screen, waitFor, render } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { GameStateProvider } from '@/state/providers';
import { GameStateContext } from '@/state/context';
import { useSession } from 'next-auth/react';

vi.mock('@/components', () => ({
    LoadingIndicator: () => <div data-testid="loading" />,
}));

vi.mock('next-auth/react', async () => {
    const original = await vi.importActual('next-auth/react');
    return {
        ...original,
        useSession: vi.fn(() => ({
            data: null,
            status: 'loading',
        })),
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

    it('renders children', () => {
        vi.mocked(useSession).mockReturnValue({
            data: { user: { id: '1', name: 'Test' } },
            status: 'authenticated',
        } as never);

        render(
            <GameStateProvider>
                <div>Child content</div>
            </GameStateProvider>,
        );

        expect(screen.getByText('Child content')).toBeInTheDocument();
        expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    it('provides context to children', async () => {
        vi.mocked(useSession).mockReturnValue({
            data: { user: { id: '1', name: 'Test', currency: { bones: 123 } } },
            status: 'authenticated',
        } as never);

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
