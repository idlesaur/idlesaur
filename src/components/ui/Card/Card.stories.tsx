import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Card } from './Card';

const meta = {
    component: Card,
    title: 'Components/UI/Card',
    args: {
        children: 'Test Card Contents',
    },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
