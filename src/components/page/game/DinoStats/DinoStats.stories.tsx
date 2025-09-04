import type { Meta, StoryObj } from '@storybook/nextjs';

import { DinoStats } from '@/components/page/game';
import { createDino } from '@/state/util';

const meta = {
    component: DinoStats,
    title: 'Components/Page/Game/DinoStats',
    args: {
        dino: createDino({ name: 'Storybook Dino' }),
    },
} satisfies Meta<typeof DinoStats>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
