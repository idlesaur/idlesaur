import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';

import { BuildADinoCard } from '@/components/page/game';
import {
    withCurrencyState,
    withUpgradesState,
} from '../../../../../.storybook/decorators';

const meta = {
    component: BuildADinoCard,
    title: 'Components/Page/Game/BuildADinoCard',
    args: {
        buyDinoAction: fn(),
        buyDinosaurCapacityUpgradeAction: fn(),
    },
} satisfies Meta<typeof BuildADinoCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CanAfford: Story = {
    decorators: [
        withCurrencyState({ bones: 6000000 }),
        withUpgradesState({ dinosaurCapacity: 2 }),
    ],
};
