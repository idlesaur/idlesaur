import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';

import { Button } from './Button';

const meta = {
    component: Button,
    title: 'Components/UI/Button',
    args: {
        children: 'Test button',
        onClick: fn(),
    },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Disabled: Story = {
    args: {
        disabled: true,
    },
};

export const Secondary: Story = {
    args: {
        variant: 'secondary',
    },
};
