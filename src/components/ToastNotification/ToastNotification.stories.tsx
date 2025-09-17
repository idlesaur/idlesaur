import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { ToastNotification } from '@/components';

const meta = {
    component: ToastNotification,
    title: 'Components/ToastNotification',
    args: {
        title: 'Toast title',
        content: 'This is a toast notification',
        variant: 'success',
    },
} satisfies Meta<typeof ToastNotification>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LongText: Story = {
    args: {
        title: 'Long Text',
        content:
            'This is a really long toast notification that just goes on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on',
    },
};

export const Success: Story = {
    args: {
        title: 'Toast Success',
        content: 'This is a successful toast notification.',
        variant: 'success',
    },
};

export const Error: Story = {
    args: {
        title: 'Toast Error',
        content: 'This is an error toast notification.',
        variant: 'error',
    },
};

export const Info: Story = {
    args: {
        title: 'Toast Info',
        content: 'This is an info toast notification.',
        variant: 'info',
    },
};

export const Warning: Story = {
    args: {
        title: 'Toast Warning',
        content: `This is a warning notification.`,
        variant: 'warning',
    },
};
