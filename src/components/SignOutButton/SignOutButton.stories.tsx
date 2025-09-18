import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { SignOutButton } from '@/components';

const meta = {
    component: SignOutButton,
    title: 'Components/SignOutButton',
} satisfies Meta<typeof SignOutButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
