import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Footer } from '@/components';

const meta = {
    component: Footer,
    title: 'Components/Footer',
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
