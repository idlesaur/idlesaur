import '../src/app/globals.css';

import type { Preview } from '@storybook/nextjs-vite';
import { initialize, mswLoader } from 'msw-storybook-addon';

import {
    withCurrencyState,
    withDinosaursState,
    withUpgradesState,
    withSessionState,
} from './decorators';

// Initialize MSW
initialize();

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
    decorators: [
        withSessionState(),
        withDinosaursState(),
        withCurrencyState(),
        withUpgradesState(),
    ],
    loaders: [mswLoader],
};

export default preview;
