import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { CardHeading } from './CardHeading';

const meta = {
    component: CardHeading,
    title: 'Components/UI/CardHeading',
    args: {
        children: 'Card Heading',
    },
} satisfies Meta<typeof CardHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
