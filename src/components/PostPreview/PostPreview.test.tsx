// PostPreview.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PostPreview, PostPreviewProps } from '@/components';
import { Routes } from '@/constants';

// Mock components from @/components/ui
vi.mock('@/components/ui', () => ({
    Heading: ({ children }: { level: number; children: React.ReactNode }) => (
        <h4 data-testid="heading">{children}</h4>
    ),
    LinkButton: ({
        href,
        children,
    }: {
        href: string;
        children: React.ReactNode;
    }) => (
        <a data-testid="link" href={href}>
            {children}
        </a>
    ),
}));

describe('PostPreview', () => {
    const mockPost: PostPreviewProps['post'] = {
        id: 123,
        title: 'Test Post Title',
        // Add any required Post fields here if your generated type has more
    } as never;

    it('renders the post title in a heading', () => {
        render(<PostPreview post={mockPost} />);
        const heading = screen.getByTestId('heading');
        expect(heading).toHaveTextContent(mockPost.title);
    });

    it('renders a link with the correct href', () => {
        render(<PostPreview post={mockPost} />);
        const link = screen.getByTestId('link');
        const expectedHref = Routes.POST.replace(':id', String(mockPost.id));
        expect(link).toHaveAttribute('href', expectedHref);
    });

    it('renders the ">" symbol inside the link', () => {
        render(<PostPreview post={mockPost} />);
        const link = screen.getByTestId('link');
        expect(link).toHaveTextContent('>');
    });
});
