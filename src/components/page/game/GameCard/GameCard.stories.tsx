import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { DiCode } from 'react-icons/di';

import { GameCard } from './GameCard';

const meta = {
    component: GameCard,
    title: 'Components/Page/Game/GameCard',
    args: {
        title: 'Game Card',
        children: 'Test button',
        icon: <DiCode />,
    },
} satisfies Meta<typeof GameCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
