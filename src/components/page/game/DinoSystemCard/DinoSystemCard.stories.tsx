import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';

import { DinoSystemCard } from '@/components/page/game';
import {
    withCurrencyState,
    withDinosaursState,
    withUpgradesState,
} from '../../../../../.storybook/decorators';
import { mockDinosaur } from '@/test/mockFactory';

const meta = {
    component: DinoSystemCard,
    title: 'Components/Page/Game/DinoSystemCard',
    args: {
        buyDinoAction: fn(),
        buyDinosaurCapacityUpgradeAction: fn(),
    },
} satisfies Meta<typeof DinoSystemCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CanAfford: Story = {
    decorators: [
        withCurrencyState({ bones: 6000000 }),
        withUpgradesState({ dinosaurCapacity: 2 }),
    ],
};

export const WithDinos: Story = {
    decorators: [
        withDinosaursState({
            dinosaurs: [
                mockDinosaur({ name: 'Dino 1' }),
                mockDinosaur({ name: 'Dino 2' }),
            ],
        }),
        withUpgradesState({ dinosaurCapacity: 2 }),
    ],
};
