import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import React from 'react';

import { Logo } from './Logo';

vi.mock('next/font/google', () => ({
    Rubik_Wet_Paint: () => ({
        className: 'mocked-font-class',
    }),
}));

vi.mock('@/components/ui', () => ({
    Heading: ({ children, className, level }: never) => {
        const Tag = `h${level || 1}`;
        return (
            // @ts-expect-error tests
            <Tag data-testid="heading" className={className}>
                {children}
            </Tag>
        );
    },
}));

describe('Logo', () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it('renders with default heading level 1', () => {
        render(<Logo />);
        const heading = screen.getByTestId('heading');
        expect(heading).toHaveTextContent('Idlesaur');
        expect(heading.tagName).toBe('H1');
        expect(heading).toHaveClass('mocked-font-class');
    });

    it('renders with custom heading level', () => {
        render(<Logo level={3} />);
        const heading = screen.getByTestId('heading');
        expect(heading.tagName).toBe('H3');
    });
});
