import { expect, describe, vi, beforeEach, it } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from '@/test/util';
import { prisma } from '@/prisma';

import Page from './page';

vi.mock('next/navigation');

vi.mock('@/prisma', () => ({
    prisma: {
        post: {
            findMany: vi.fn(),
        },
    },
}));

describe('Home page', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('fetches posts ordered by createdAt desc', async () => {
        const mockPosts = [
            { id: 1, title: 'First post' },
            { id: 2, title: 'Second post' },
        ];
        // @ts-expect-error bad model data
        vi.mocked(prisma.post.findMany).mockResolvedValue(mockPosts);

        // since Home is async, await it
        const Home = await Page();

        render(Home);

        expect(
            screen.getByRole('heading', { level: 1, name: 'Idlesaur' }),
        ).toBeDefined();
        expect(prisma.post.findMany).toHaveBeenCalledWith({
            orderBy: { createdAt: 'desc' },
        });
        expect(screen.getByText(mockPosts[0].title)).toBeInTheDocument();
        expect(screen.getByText(mockPosts[1].title)).toBeInTheDocument();
    });

    it('renders with no posts if database returns empty array', async () => {
        vi.mocked(prisma.post.findMany).mockResolvedValue([]);

        const Home = await Page();

        render(Home);

        expect(screen.queryByText('First post')).not.toBeInTheDocument();
    });
});
