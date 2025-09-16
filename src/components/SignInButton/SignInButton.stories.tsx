import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { SignInButton } from '@/components';

const meta = {
    component: SignInButton,
    title: 'Components/SignInButton',
} satisfies Meta<typeof SignInButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
