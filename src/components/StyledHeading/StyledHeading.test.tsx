import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import React from 'react';
import { StyledHeading } from '@/components/StyledHeading';

vi.mock('next/font/google', () => ({
    Black_Han_Sans: () => ({
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

describe('StyledHeading', () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it('renders with default heading level 1', () => {
        render(<StyledHeading>test</StyledHeading>);
        const heading = screen.getByTestId('heading');
        expect(heading).toHaveTextContent('test');
        expect(heading.tagName).toBe('H1');
        expect(heading).toHaveClass('mocked-font-class');
    });

    it('renders with custom heading level', () => {
        render(<StyledHeading level={3}>test</StyledHeading>);
        const heading = screen.getByTestId('heading');
        expect(heading.tagName).toBe('H3');
    });
});
