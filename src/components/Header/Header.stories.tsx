import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Header } from '@/components';

const meta = {
    component: Header,
    title: 'Components/Header',
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
