import type { Meta, StoryObj } from '@storybook/nextjs';

import { DinoSystemCard } from '@/components';
import { withGameState } from '../../../../.storybook/decorators/GameStateDecorator';
import { createDino } from '@/state/util/createDino';

const meta = {
    component: DinoSystemCard,
    title: 'Components/Game/DinoSystemCard',
} satisfies Meta<typeof DinoSystemCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDinos: Story = {
    decorators: [
        withGameState({
            dinos: [createDino(), createDino()],
            maxDinos: 42,
        }),
    ],
};
