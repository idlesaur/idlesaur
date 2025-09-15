import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { DinoSystemCard } from '@/components/page/game';
import { withDinosaursState } from '../../../../../.storybook/decorators';
import { mockDinosaur } from '@/test/mockFactory';

const meta = {
    component: DinoSystemCard,
    title: 'Components/Page/Game/DinoSystemCard',
} satisfies Meta<typeof DinoSystemCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDinos: Story = {
    decorators: [
        withDinosaursState({
            dinosaurs: [mockDinosaur(), mockDinosaur()],
        }),
    ],
};
