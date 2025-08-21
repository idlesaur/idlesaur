import type { Meta, StoryObj } from '@storybook/nextjs';
import { DiCode } from 'react-icons/di';

import { GameCard } from '@/components/Game';

const meta = {
    component: GameCard,
    title: 'Components/Game/GameCard',
    args: {
        title: 'Game Card',
        children: 'Test button',
        icon: <DiCode />,
    },
} satisfies Meta<typeof GameCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
