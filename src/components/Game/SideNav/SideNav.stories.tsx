import type { Meta, StoryObj } from '@storybook/nextjs';
import { fn } from 'storybook/test';

import { SideNav } from '@/components/Game';

const meta = {
    component: SideNav,
    title: 'Components/Game/SideNav',
    args: {
        isOpen: true,
        onClose: fn(),
    },
} satisfies Meta<typeof SideNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
