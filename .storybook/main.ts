import type { StorybookConfig } from '@storybook/nextjs';
import path from 'path';

const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: [
        '@chromatic-com/storybook',
        '@storybook/addon-docs',
        '@storybook/addon-a11y',
        '@storybook/addon-vitest',
    ],
    framework: {
        name: '@storybook/nextjs',
        options: {},
    },
    core: {
        disableTelemetry: true,
    },
    webpackFinal: async (config) => {
        if (config.resolve) {
            config.resolve.alias = {
                ...(config.resolve.alias || {}),
                '@': path.resolve(__dirname, '../src'),
            };
        }
        return config;
    },
};

export default config;
