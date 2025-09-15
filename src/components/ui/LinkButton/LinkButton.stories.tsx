import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { LinkButton } from './LinkButton';

const meta = {
    component: LinkButton,
    title: 'Components/UI/LinkButton',
    args: {
        children: 'Test LinkButton',
        href: '',
    },
} satisfies Meta<typeof LinkButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = {
    args: {
        variant: 'secondary',
    },
};
