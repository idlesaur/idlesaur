import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';

import { SideNav } from '@/components';
import { withMockedSessionState } from '../../../.storybook/decorators';

const meta = {
    component: SideNav,
    title: 'Components/SideNav',
    args: {
        isOpen: true,
        onClose: fn(),
    },
} satisfies Meta<typeof SideNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SignedOut: Story = {};

export const SignedIn: Story = {
    decorators: [withMockedSessionState()],
};
