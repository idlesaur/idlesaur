import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { StyledHeading } from '@/components';

const meta = {
    component: StyledHeading,
    title: 'Components/StyledHeading',
    args: {
        children: 'Styled Heading',
    },
} satisfies Meta<typeof StyledHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Level1: Story = {
    args: {
        level: 1,
    },
};

export const Level2: Story = {
    args: {
        level: 2,
    },
};

export const Level3: Story = {
    args: {
        level: 3,
    },
};

export const Level4: Story = {
    args: {
        level: 4,
    },
};
