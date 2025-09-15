import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { LoadingIndicator } from '@/components';

const meta = {
    component: LoadingIndicator,
    title: 'Components/LoadingIndicator',
} satisfies Meta<typeof LoadingIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
