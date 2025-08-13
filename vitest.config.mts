import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [tsconfigPaths(), react()],
    test: {
        coverage: {
            enabled: true,
            include: ['src/**'],
            exclude: [
                '**/*.stories.*',
                '**/*.test.*',
                'src/app/**',
                'src/generated/**',
                'src/types.ts',
                'src/prisma.ts',
            ],
            thresholds: {
                functions: 95,
                branches: 93,
                statements: 95,
                lines: 95,
            },
        },
        globals: true,
        setupFiles: ['./vitest.setup.ts'],
        environment: 'jsdom',
    },
});
