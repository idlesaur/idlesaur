import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { ProfileDropdown } from '@/components';
import { withSessionState } from '../../../.storybook/decorators';

const meta = {
    component: ProfileDropdown,
    title: 'Components/ProfileDropdown',
} satisfies Meta<typeof ProfileDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoUserImage: Story = {};

export const HasUserImage: Story = {
    decorators: [
        withSessionState({
            user: {
                image: 'test.png',
                id: '1',
            },
            expires: '',
        }),
    ],
};
