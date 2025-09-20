import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';

import { SideNav } from '@/components';
import { withMockedSessionState } from '../../../.storybook/decorators';
import { http, HttpResponse } from 'msw';

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

export const SignedOut: Story = {
    parameters: {
        msw: {
            handlers: [
                http.get('/api/auth/session', () => {
                    return HttpResponse.error();
                }),
            ],
        },
    },
};

export const SignedIn: Story = {
    decorators: [withMockedSessionState()],
};
