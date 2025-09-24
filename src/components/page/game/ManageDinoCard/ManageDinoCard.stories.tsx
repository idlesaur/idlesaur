import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';

import { ManageDinoCard } from '@/components/page/game';
import { mockDinosaur } from '@/test/mockFactory';
import { withDinosaursState } from '../../../../../.storybook/decorators';

const meta = {
    component: ManageDinoCard,
    title: 'Components/Page/Game/ManageDinoCard',
    args: {
        renameDinosaurAction: fn(),
    },
    decorators: [
        withDinosaursState({
            selectedDinosaur: mockDinosaur({ name: 'Storybook Dino' }),
        }),
    ],
} satisfies Meta<typeof ManageDinoCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
