import { render, screen } from '@testing-library/react';
import { describe, it, vi, expect, beforeEach } from 'vitest';
import { useToastsStore } from '@/state/providers';

import { ToastNotificationContainer } from '@/components';

vi.mock('@/state/providers', () => ({
    useToastsStore: vi.fn(),
}));

describe('ToastNotificationContainer', () => {
    let removeToast: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        removeToast = vi.fn();
    });

    it('renders no toasts when store is empty', () => {
        vi.mocked(useToastsStore).mockImplementation(() => ({
            toasts: [],
            removeToast,
        }));

        render(<ToastNotificationContainer />);
        expect(screen.queryByTestId('toast')).toBeNull();
    });

    it('renders a toast when store has one', () => {
        vi.mocked(useToastsStore).mockImplementation(() => ({
            toasts: [
                { id: '1', title: 'Hello', content: 'World', variant: 'info' },
            ],
            removeToast,
        }));

        render(<ToastNotificationContainer />);
        expect(screen.getByText('Hello')).toBeInTheDocument();
        expect(screen.getByText('World')).toBeInTheDocument();
    });
});
