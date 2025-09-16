import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { BoneButtonUI } from './BoneButtonUI';
import { fn } from 'storybook/test';

const meta = {
    component: BoneButtonUI,
    title: 'Components/Page/Game/BoneButton',
    args: {
        onClick: fn(),
        isPending: false,
    },
} satisfies Meta<typeof BoneButtonUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Pending: Story = {
    args: {
        isPending: true,
    },
};
