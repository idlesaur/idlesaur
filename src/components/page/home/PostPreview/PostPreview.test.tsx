import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PostPreview, PostPreviewProps } from '@/components/home';
import { Routes } from '@/constants';
import { generateSlug } from '@/util';

vi.mock('@/components/ui', () => ({
    CardHeading: ({
        children,
    }: {
        level: number;
        children: React.ReactNode;
    }) => <h4 data-testid="card-heading">{children}</h4>,
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
    Card: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="card">{children}</div>
    ),
}));

describe('PostPreview', () => {
    const mockPost: PostPreviewProps['post'] = {
        id: 123,
        title: 'Test Post Title',
        slug: generateSlug('Test Post Title'),
        // Add any required Post fields here if your generated type has more
    } as never;

    it('renders the post title in a heading', () => {
        render(<PostPreview post={mockPost} />);
        const heading = screen.getByTestId('card-heading');
        expect(heading).toHaveTextContent(mockPost.title);
    });

    it('renders a link with the correct href', () => {
        render(<PostPreview post={mockPost} />);
        const link = screen.getByTestId('link');
        const expectedHref = Routes.POST.replace(':id', String(mockPost.slug));
        expect(link).toHaveAttribute('href', expectedHref);
    });
});
