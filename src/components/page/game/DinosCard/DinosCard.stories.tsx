import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';

import { DinosCard } from '@/components/page/game';
import {
    withDinosaursState,
    withUpgradesState,
} from '../../../../../.storybook/decorators';
import { mockDinosaur } from '@/test/mockFactory';

const meta = {
    component: DinosCard,
    title: 'Components/Page/Game/DinosCard',
    args: {
        buyDinoAction: fn(),
        buyDinosaurCapacityUpgradeAction: fn(),
    },
} satisfies Meta<typeof DinosCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoDinosNoCard: Story = {};

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
