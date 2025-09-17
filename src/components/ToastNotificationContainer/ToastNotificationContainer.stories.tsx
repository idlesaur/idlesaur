import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { ToastNotificationContainer } from '@/components';

const meta = {
    component: ToastNotificationContainer,
    title: 'Components/ToastNotificationContainer',
    args: {},
} satisfies Meta<typeof ToastNotificationContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
