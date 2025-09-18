import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { ResourceDisplay, ResourceType } from '@/components';

const meta = {
    component: ResourceDisplay,
    title: 'Components/ResourceDisplay',
    args: {
        value: 123,
    },
} satisfies Meta<typeof ResourceDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Bones: Story = {
    args: {
        type: ResourceType.BONES,
    },
};
