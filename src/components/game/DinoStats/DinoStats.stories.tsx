import type { Meta, StoryObj } from '@storybook/nextjs';

import { DinoStats } from '@/components/game';
import { createDino } from '@/state/util';

const meta = {
    component: DinoStats,
    title: 'Components/Game/DinoStats',
    args: {
        dino: createDino({ name: 'Storybook Dino' }),
    },
} satisfies Meta<typeof DinoStats>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
