import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Tooltip } from './Tooltip';
import React from 'react';

const meta = {
    component: Tooltip,
    title: 'Components/UI/Tooltip',
    args: {
        children: (
            <div className="bg-background-700 flex flex-row items-start justify-between rounded-sm p-2">
                Hover Me
            </div>
        ),
        content: <div>Tool tip!</div>,
    },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
