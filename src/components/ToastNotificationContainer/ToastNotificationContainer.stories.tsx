import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { ToastNotificationContainer } from '@/components';
import { Button } from '@/components/ui';
import { useToastsStore } from '@/state/providers';

const meta = {
    component: ToastNotificationContainer,
    title: 'Components/ToastNotificationContainer',
    args: {},
    decorators: [
        (Story) => {
            const {
                addSuccessToast,
                addErrorToast,
                addWarningToast,
                addInfoToast,
            } = useToastsStore((state) => state);
            return (
                <div>
                    <div className="flex flex-row gap-2">
                        <Button
                            onClick={() =>
                                addSuccessToast(
                                    'Success Notification',
                                    'With some content message.',
                                )
                            }
                            type="button"
                        >
                            Add Success Notification
                        </Button>
                        <Button
                            onClick={() =>
                                addErrorToast(
                                    'Error Notification',
                                    'With some content message.',
                                )
                            }
                            type="button"
                        >
                            Add Error Notification
                        </Button>
                        <Button
                            onClick={() =>
                                addInfoToast(
                                    'Info Notification',
                                    'With some content message.',
                                )
                            }
                            type="button"
                        >
                            Add Info Notification
                        </Button>
                        <Button
                            onClick={() =>
                                addWarningToast(
                                    'Warning Notification',
                                    'With some content message.',
                                )
                            }
                            type="button"
                        >
                            Add Warning Notification
                        </Button>
                    </div>

                    <Story />
                </div>
            );
        },
    ],
} satisfies Meta<typeof ToastNotificationContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
