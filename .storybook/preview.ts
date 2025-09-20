import '../src/app/globals.css';

import { http, HttpResponse } from 'msw';
import type { Preview } from '@storybook/nextjs-vite';
import { initialize, mswLoader } from 'msw-storybook-addon';

import {
    withCurrencyState,
    withDinosaursState,
    withUpgradesState,
    withSessionState,
    withToastsState,
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
        msw: {
            handlers: [
                http.get('/api/auth/session', () => {
                    return HttpResponse.json({
                        firstName: 'Neil',
                        lastName: 'Maverick',
                    });
                }),
            ],
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
        withToastsState(),
    ],
    loaders: [mswLoader],
};

export default preview;
