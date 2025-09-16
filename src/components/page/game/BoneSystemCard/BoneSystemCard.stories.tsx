import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { BoneSystemCard } from './BoneSystemCard';
import { fn } from 'storybook/test';
import { withCurrencyState } from '../../../../../.storybook/decorators';

const meta = {
    component: BoneSystemCard,
    title: 'Components/Page/Game/BoneSystemCard',
    args: {
        buyBoneDiggersAction: fn(),
        digAction: fn(),
    },
} satisfies Meta<typeof BoneSystemCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CanAfford: Story = {
    decorators: [withCurrencyState({ bones: 1459000 })],
};
