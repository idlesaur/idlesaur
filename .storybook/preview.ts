import '../src/app/globals.css';

import { sb } from 'storybook/test';
import type { Preview } from '@storybook/nextjs-vite';

import {
    withCurrencyState,
    withUpgradesState,
    withSessionState,
} from './decorators';

// @ts-expect-error https://storybook.js.org/docs/writing-stories/mocking-data-and-modules/mocking-modules?ref=storybookblog.ghost.io#registering-modules-to-mock
sb.mock(import('../src/app/lib/actions/index.ts'));

// @ts-expect-error https://storybook.js.org/docs/writing-stories/mocking-data-and-modules/mocking-modules?ref=storybookblog.ghost.io#registering-modules-to-mock
sb.mock(import('../src/prisma.ts'));

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
    decorators: [withSessionState(), withCurrencyState(), withUpgradesState()],
};

export default preview;
