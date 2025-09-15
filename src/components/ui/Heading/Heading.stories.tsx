import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Heading } from './Heading';

const meta = {
    component: Heading,
    title: 'Components/UI/Heading',
    args: {
        children: 'Default (Level 1)',
    },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Level1: Story = {
    args: {
        level: 1,
        children: 'Level 1',
    },
};

export const Level2: Story = {
    args: {
        level: 2,
        children: 'Level 2',
    },
};

export const Level3: Story = {
    args: {
        level: 3,
        children: 'Level 3',
    },
};

export const Level4: Story = {
    args: {
        level: 4,
        children: 'Level 4',
    },
};
