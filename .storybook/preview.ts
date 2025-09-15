import '../src/app/globals.css';

import type { Preview } from '@storybook/nextjs-vite';
import {
    withCurrencyState,
    withUpgradesState,
    withSessionState,
} from './decorators';

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
