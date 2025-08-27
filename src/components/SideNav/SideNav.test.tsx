import { screen, fireEvent } from '@testing-library/react';

import { getRender, render } from '@/test/util';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SideNav, SideNavProps } from './SideNav';
import { Session } from 'next-auth';

vi.mock('@/components', () => ({
    SignOutButton: () => <button data-testid="sign-out-btn">Sign Out</button>,
    SignInButton: () => <button data-testid="sign-in-btn">Sign In</button>,
}));

describe('SideNav', () => {
    let onClose: ReturnType<typeof vi.fn>;

    const signedInRender = getRender({
        session: {
            user: {
                name: 'test',
                id: 'f',
                profile: null,
                currency: null,
                upgrades: null,
            },
        } as Session,
    });
    const signedOutRender = render;

    const renderComponent = (
        props?: Partial<SideNavProps>,
        signedIn: boolean = false,
    ) => {
        const renderer = signedIn ? signedInRender : signedOutRender;
        return renderer(
            <SideNav
                isOpen={props?.isOpen ?? false}
                onClose={props?.onClose ?? onClose}
            />,
        );
    };

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

    it('renders signed in content', () => {
        renderComponent({ isOpen: true }, true);
        expect(screen.getByTestId('sign-out-btn')).toBeInTheDocument();
    });

    it('renders signed out content', () => {
        renderComponent({ isOpen: true });
        expect(screen.getByTestId('sign-in-btn')).toBeInTheDocument();
    });
});
