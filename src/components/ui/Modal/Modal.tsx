'use client';

import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

type ModalProps = {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    ariaLabel?: string;
    ariaLabelledBy?: string;
    ariaDescribedBy?: string;
    className?: string;
    backdropClassName?: string;
    containerId?: string; // Optional: portal target (defaults to document.body)
};

/**
 * Accessible Modal
 * - Disables background scroll when open
 * - Closes on ESC and backdrop click
 * - Traps focus inside modal
 * - Restores focus to previously focused element on close
 */
export function Modal({
    open,
    onClose,
    children,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
    className,
    backdropClassName,
    containerId,
}: ModalProps) {
    const dialogRef = useRef<HTMLDivElement | null>(null);
    const lastFocusedRef = useRef<HTMLElement | null>(null);

    // Lock body scroll when open
    useEffect(() => {
        if (!open) return;
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, [open]);

    // Save previous focus and move focus into dialog when opened
    useEffect(() => {
        if (!open) return;

        lastFocusedRef.current =
            (document.activeElement as HTMLElement) || null;

        const el = dialogRef.current;
        if (!el) return;

        // Move focus to the first focusable element or dialog itself
        const focusable = getFocusableElements(el);

        if (focusable[0] as HTMLElement) {
            (focusable[0] as HTMLElement)?.focus?.();
        } else {
            el.focus();
        }

        return () => {
            // Restore previous focus
            lastFocusedRef.current?.focus?.();
        };
    }, [open]);

    // Handle ESC to close
    useEffect(() => {
        if (!open) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                e.stopPropagation();
                onClose();
            }
            // Focus trap with Tab
            if (e.key === 'Tab') {
                const el = dialogRef.current;
                if (!el) return;
                const focusable = getFocusableElements(el);
                if (focusable.length === 0) {
                    e.preventDefault();
                    el.focus();
                    return;
                }
                const first = focusable[0] as HTMLElement;
                const last = focusable[focusable.length - 1] as HTMLElement;
                const active = document.activeElement as HTMLElement | null;

                if (e.shiftKey) {
                    if (active === first || !el.contains(active)) {
                        e.preventDefault();
                        last.focus();
                    }
                } else {
                    if (active === last || !el.contains(active)) {
                        e.preventDefault();
                        first.focus();
                    }
                }
            }
        };
        document.addEventListener('keydown', onKeyDown, true);
        return () => document.removeEventListener('keydown', onKeyDown, true);
    }, [open, onClose]);

    if (!open) return null;

    const portalTarget =
        (containerId ? document.getElementById(containerId) : null) ??
        document.body;

    const backdropClasses =
        backdropClassName ??
        'fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4';

    const panelClasses =
        className ??
        'relative w-full max-w-lg rounded-lg shadow-xl outline-none focus:outline-none';

    const onBackdropClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
        // Close only if the backdrop itself was clicked
        if (e.target === e.currentTarget) onClose();
    };

    return createPortal(
        <div
            role="presentation"
            className={backdropClasses}
            onMouseDown={onBackdropClick}
            aria-hidden={false}
        >
            <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-label={ariaLabel}
                aria-labelledby={ariaLabel ? undefined : ariaLabelledBy}
                aria-describedby={ariaDescribedBy}
                tabIndex={-1}
                className={panelClasses}
            >
                {children}
            </div>
        </div>,
        portalTarget,
    );
}

function getFocusableElements(root: HTMLElement): HTMLElement[] {
    const selectors = [
        'a[href]',
        'area[href]',
        'button:not([disabled])',
        'input:not([disabled]):not([type="hidden"])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        'summary',
        'iframe',
        'object',
        'embed',
        '[contenteditable]',
        '[tabindex]:not([tabindex="-1"])',
    ].join(',');
    const nodes = Array.from(root.querySelectorAll<HTMLElement>(selectors));
    return nodes.filter((el) => !el.hasAttribute('disabled') && isVisible(el));
}

function isVisible(el: HTMLElement): boolean {
    const style = window.getComputedStyle(el);
    if (style.visibility === 'hidden' || style.display === 'none') return false;
    const rect = el.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
}
