import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { PostPreview } from '@/components/page/home';
import { mockedDate } from '@/test/util';

const meta = {
    component: PostPreview,
    title: 'Components/Page/Home/PostPreview',
    args: {
        post: {
            id: 1,
            slug: 'post-1',
            title: 'Post 1',
            content: 'Post 1 content',
            createdAt: mockedDate,
            updatedAt: mockedDate,
            published: true,
        },
    },
} satisfies Meta<typeof PostPreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
