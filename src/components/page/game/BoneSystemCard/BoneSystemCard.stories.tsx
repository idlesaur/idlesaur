import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { BoneSystemCard } from './BoneSystemCard';

const meta = {
    component: BoneSystemCard,
    title: 'Components/Page/Game/BoneSystemCard',
} satisfies Meta<typeof BoneSystemCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
