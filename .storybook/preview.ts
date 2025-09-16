import '../src/app/globals.css';

import { sb } from 'storybook/test';
import type { Preview } from '@storybook/nextjs-vite';
import { initialize, mswLoader } from 'msw-storybook-addon';

import {
    withCurrencyState,
    withUpgradesState,
    withSessionState,
} from './decorators';

// Initialize MSW
initialize();

// @ts-expect-error https://storyb
sb.mock(import('@/app/lib/actions/index.ts'));

// @ts-expect-error https://storybook.js.org/docs/writing-stories/mocking-data-and-modules/mocking-modules?ref=storybookblog.ghost.io#registering-modules-to-mock
sb.mock(import('../src/prisma.ts'));

// sb.mock(import('next-auth'));
// sb.mock(import('next-auth/react'));

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        nextjs: {
            appDirectory: true,
        },
    },
    decorators: [withSessionState(), withCurrencyState(), withUpgradesState()],
    loaders: [mswLoader],
};

export default preview;
