import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { ManageDinoCard } from '@/components/page/game';
import { mockDinosaur } from '@/test/mockFactory';

const meta = {
    component: ManageDinoCard,
    title: 'Components/Page/Game/ManageDinoCard',
    args: {
        dinosaur: mockDinosaur({ name: 'Storybook Dino' }),
    },
} satisfies Meta<typeof ManageDinoCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
