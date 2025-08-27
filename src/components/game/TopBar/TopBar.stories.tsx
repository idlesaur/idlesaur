import type { Meta, StoryObj } from '@storybook/nextjs';

import { TopBar } from './TopBar';
import { withGameState } from '../../../../.storybook/decorators/GameStateDecorator';

const meta = {
    component: TopBar,
    title: 'Components/TopBar',
    decorators: [withGameState({ bones: 42 })],
} satisfies Meta<typeof TopBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
