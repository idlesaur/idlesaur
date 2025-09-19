import { act, render, screen } from '@testing-library/react';
import {
    describe,
    it,
    vi,
    expect,
    beforeEach,
    beforeAll,
    afterAll,
} from 'vitest';
import { useToastsStore } from '@/state/providers';

import { ToastNotificationContainer } from '@/components';
import { mockUseToastsStore, mockRemoveToast } from '@/test/mockFactory';

vi.mock('@/state/providers', { spy: true });

describe('ToastNotificationContainer', () => {
    const mockUseToastsStoreInstance = vi.mocked(useToastsStore);

    beforeAll(() => {
        vi.useFakeTimers();
    });

    afterAll(() => {
        vi.useRealTimers();
    });

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders no toasts when store is empty', () => {
        mockUseToastsStore(mockUseToastsStoreInstance);
        render(<ToastNotificationContainer />);
        expect(screen.queryByTestId('toast')).toBeNull();
    });

    it('renders a toast when store has one', () => {
        mockUseToastsStore(mockUseToastsStoreInstance, {
            toasts: [
                {
                    id: '1',
                    title: 'Hello',
                    content: 'World',
                    variant: 'info',
                },
            ],
        });

        render(<ToastNotificationContainer />);
        expect(screen.getByText('Hello')).toBeInTheDocument();
        expect(screen.getByText('World')).toBeInTheDocument();
    });

    it('Removes a toast during onClose', () => {
        mockUseToastsStore(mockUseToastsStoreInstance, {
            toasts: [
                {
                    id: '1',
                    title: 'Hello',
                    content: 'World',
                    variant: 'info',
                },
            ],
        });

        render(<ToastNotificationContainer />);
        expect(screen.getByText('Hello')).toBeInTheDocument();
        expect(screen.getByText('World')).toBeInTheDocument();

        act(() => {
            // toast display
            vi.advanceTimersToNextTimer();
            // timeout before onclose to show animation
            vi.advanceTimersToNextTimer();
        });
        expect(mockRemoveToast).toHaveBeenCalled();
    });
});
