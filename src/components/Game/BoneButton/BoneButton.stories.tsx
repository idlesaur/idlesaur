import type { Meta, StoryObj } from '@storybook/nextjs';

import { BoneButton } from '@/components/Game';

const meta = {
    component: BoneButton,
    title: 'Components/Game/BoneButton',
} satisfies Meta<typeof BoneButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
