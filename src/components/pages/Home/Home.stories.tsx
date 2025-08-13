import type { Meta, StoryObj } from '@storybook/nextjs';

import { Home } from './Home';

const meta = {
    component: Home,
    title: 'Pages/Home',
    decorators: [],
    args: {
        posts: [],
    },
} satisfies Meta<typeof Home>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
