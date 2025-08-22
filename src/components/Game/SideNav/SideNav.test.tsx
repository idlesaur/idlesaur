// SideNav.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SideNav, SideNavProps } from './SideNav';

// Mock SignOutButton so we can check it's rendered
vi.mock('@/components', () => ({
    SignOutButton: () => <button data-testid="sign-out-btn">Sign Out</button>,
}));

describe('SideNav', () => {
    let onClose: ReturnType<typeof vi.fn>;
    const renderComponent = (props?: Partial<SideNavProps>) =>
        render(
            <SideNav
                isOpen={props?.isOpen ?? false}
                onClose={props?.onClose ?? onClose}
            />,
        );

    beforeEach(() => {
        onClose = vi.fn();
    });

    it('renders closed by default', () => {
        renderComponent();
        const overlay = screen.getByTestId('overlay');
        expect(overlay.className).toContain('pointer-events-none');
        expect(document.body.innerHTML).toContain('-translate-x-full');
    });

    it('calls onClose when overlay is clicked', () => {
        renderComponent({ isOpen: true });
        const overlay = screen.getByTestId('overlay');
        fireEvent.click(overlay);
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('renders open when isOpen is true', () => {
        renderComponent({ isOpen: true });
        expect(document.body.innerHTML).toContain('pointer-events-auto');
        expect(document.body.innerHTML).toContain('translate-x-0');
    });

    it('calls onClose when close icon is clicked', () => {
        renderComponent({ isOpen: true });
        const closeIcon = document.querySelector('svg'); // MdOutlineClose renders as svg
        expect(closeIcon).toBeTruthy();
        fireEvent.click(closeIcon!);
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('renders navigation items and SignOutButton', () => {
        renderComponent({ isOpen: true });
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
        expect(screen.getByText('Inventory')).toBeInTheDocument();
        expect(screen.getByText('Settings')).toBeInTheDocument();
        expect(screen.getByTestId('sign-out-btn')).toBeInTheDocument();
    });
});
