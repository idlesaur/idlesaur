import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { DinoStats } from '@/components/page/game';
import { mockDinosaur } from '@/test/mockFactory';

const meta = {
    component: DinoStats,
    title: 'Components/Page/Game/DinoStats',
    args: {
        dinosaur: mockDinosaur({ name: 'Storybook Dino' }),
    },
} satisfies Meta<typeof DinoStats>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
