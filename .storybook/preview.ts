import '../src/app/globals.css';

import type { Preview } from '@storybook/nextjs';
import { withCurrencyState, withUpgradesState } from './decorators';

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
    decorators: [withCurrencyState(), withUpgradesState()],
};

export default preview;
