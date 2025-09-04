import type { Meta, StoryObj } from '@storybook/nextjs';

import { BoneSystemCard } from '@/components/page/game';

const meta = {
    component: BoneSystemCard,
    title: 'Components/Page/Game/BoneSystemCard',
} satisfies Meta<typeof BoneSystemCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
