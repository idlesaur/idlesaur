import type { Meta, StoryObj } from '@storybook/nextjs';

import { TopBar } from './TopBar';
import { withCurrencyState } from '@/../.storybook/decorators';

const meta = {
    component: TopBar,
    title: 'Components/Page/Game/TopBar',
    decorators: [withCurrencyState({ bones: 42 })],
} satisfies Meta<typeof TopBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
