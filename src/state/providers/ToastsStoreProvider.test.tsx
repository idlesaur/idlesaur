import { act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { ToastsStoreProvider, useToastsStore } from './ToastsStoreProvider';
import { createToastsState } from '@/state/stores';

// A test component that consumes the store
const ToastsConsumer = () => {
    const toasts = useToastsStore((s) => s.toasts);
    return (
        <div>
            {toasts.map((t) => (
                <div key={t.id} data-testid="toast">
                    {t.title}
                </div>
            ))}
        </div>
    );
};

describe('ToastsStoreProvider', () => {
    it('provides default state when no initialState is passed', () => {
        render(
            <ToastsStoreProvider>
                <ToastsConsumer />
            </ToastsStoreProvider>,
        );

        // default createToastsState is expected to start empty
        expect(screen.queryByTestId('toast')).toBeNull();
    });

    it('respects the initialState passed into the provider', () => {
        const initialState = createToastsState();
        initialState.toasts.push({
            id: '1',
            title: 'Hello',
            content: 'World',
            variant: 'info',
        });

        render(
            <ToastsStoreProvider initialState={initialState}>
                <ToastsConsumer />
            </ToastsStoreProvider>,
        );

        expect(screen.getByText('Hello')).toBeInTheDocument();
    });

    it('throws an error when useToastsStore is used outside of provider', () => {
        // suppress error output in test logs
        const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

        const BadConsumer = () => {
            useToastsStore((s) => s.toasts);
            return <div />;
        };

        expect(() => render(<BadConsumer />)).toThrowError(
            /useToastsStore must be used within ToastsStoreProvider/,
        );

        spy.mockRestore();
    });

    it('updates when store state changes', async () => {
        const initialState = createToastsState();

        const AddToastButton = () => {
            const addToast = useToastsStore((s) => s.addSuccessToast);
            return (
                <button onClick={() => addToast('New Toast', 'content')}>
                    add
                </button>
            );
        };

        render(
            <ToastsStoreProvider initialState={initialState}>
                <AddToastButton />
                <ToastsConsumer />
            </ToastsStoreProvider>,
        );

        expect(screen.queryByText('New Toast')).toBeNull();

        act(() => {
            screen.getByText('add').click();
        });

        expect(screen.getByText('New Toast')).toBeInTheDocument();
    });
});
