// ToastNotification.test.tsx
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { vi, describe, beforeEach, it, expect, afterEach } from 'vitest';
import { ToastNotification, getVariantIcon } from '@/components';
import { TOAST_NOTIFICATION_TIME } from '@/constants';

describe('ToastNotification', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.clearAllTimers();
        vi.useRealTimers();
    });

    it('renders title and content', () => {
        render(
            <ToastNotification
                title="Hello"
                content="World"
                variant="success"
                onClose={() => {}}
            />,
        );

        expect(screen.getByText('Hello')).toBeInTheDocument();
        expect(screen.getByText('World')).toBeInTheDocument();
    });

    it('renders the correct icon for each variant', () => {
        const variants: Array<'success' | 'error' | 'info' | 'warning'> = [
            'success',
            'error',
            'info',
            'warning',
        ];

        variants.forEach((variant) => {
            const { container, unmount } = render(
                <ToastNotification
                    title="Test"
                    content="Test content"
                    variant={variant}
                    onClose={() => {}}
                />,
            );

            // react-icons always render <svg>
            expect(container.querySelector('svg')).toBeInTheDocument();
            unmount();
        });
    });

    it('is visible after mount', () => {
        const { container } = render(
            <ToastNotification
                title="FadeIn"
                content="Testing fade"
                variant="info"
                onClose={() => {}}
            />,
        );

        // useEffect runs immediately in RTL, so we expect the "visible" state
        expect(container.firstChild).toHaveClass('opacity-100 translate-x-0');
    });

    it('auto-dismisses after TOAST_NOTIFICATION_TIME and calls onClose after fade', () => {
        const onClose = vi.fn();

        const { container } = render(
            <ToastNotification
                title="AutoClose"
                content="Testing auto close"
                variant="warning"
                onClose={onClose}
            />,
        );

        // After mount → visible
        expect(container.firstChild).toHaveClass('opacity-100');

        // Fast-forward to auto-dismiss trigger
        act(() => {
            vi.advanceTimersByTime(TOAST_NOTIFICATION_TIME);
        });

        // Should be in fade-out state now
        expect(container.firstChild).toHaveClass('opacity-0 -translate-x-4');

        // After fade delay, onClose should fire
        act(() => {
            vi.advanceTimersByTime(300);
        });

        expect(onClose).toHaveBeenCalled();
    });
});

describe('getVariantIcon', () => {
    it('returns a valid react element for a known variant', () => {
        const icon = getVariantIcon('success');
        expect(React.isValidElement(icon)).toBe(true);
    });

    it('returns fallback icon for unknown variant', () => {
        // @ts-expect-error testing invalid case
        const icon = getVariantIcon('not-a-real-variant');
        expect(React.isValidElement(icon)).toBe(true);
    });
});
