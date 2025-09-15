import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { DiCode } from 'react-icons/di';

import { PriceButton } from '@/components/page/game';

const meta = {
    component: PriceButton,
    title: 'Components/Page/Game/PriceButton',
    args: {
        icon: <DiCode />,
        onClick: fn(),
        text: 'Price Button',
        price: 42,
    },
} satisfies Meta<typeof PriceButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Disabled: Story = {
    args: {
        disabled: true,
    },
};

export const Secondary: Story = {
    args: {
        variant: 'secondary',
    },
};
