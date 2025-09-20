import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { BonesCard } from './BonesCard';
import { fn } from 'storybook/test';
import { withCurrencyState } from '../../../../../.storybook/decorators';

const meta = {
    component: BonesCard,
    title: 'Components/Page/Game/BonesCard',
    args: {
        buyBoneDiggersAction: fn(),
        digAction: fn(),
    },
} satisfies Meta<typeof BonesCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CanAfford: Story = {
    decorators: [withCurrencyState({ bones: 1459000 })],
};
