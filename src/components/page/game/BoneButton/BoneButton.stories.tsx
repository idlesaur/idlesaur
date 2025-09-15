import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { BoneButton } from '@/components/page/game';

const meta = {
    component: BoneButton,
    title: 'Components/Page/Game/BoneButton',
} satisfies Meta<typeof BoneButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
