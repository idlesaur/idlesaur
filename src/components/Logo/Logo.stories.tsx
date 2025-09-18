import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Logo } from '@/components';

const meta = {
    component: Logo,
    title: 'Components/Logo',
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
