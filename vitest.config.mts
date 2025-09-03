import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [tsconfigPaths(), react()],
    test: {
        server: {
            deps: {
                inline: ['next'],
            },
        },
        coverage: {
            enabled: true,
            include: ['src/**'],
            exclude: [
                '**/*.stories.*',
                '**/*.test.*',
                'src/app/**',
                'src/generated/**',
                'src/next-auth.d.ts',
                'src/types.ts',
                'src/auth.ts',
                'src/prisma.ts',
            ],
            thresholds: {
                functions: 82,
                branches: 88,
                statements: 88,
                lines: 88,
            },
        },
        globals: true,
        setupFiles: ['./vitest.setup.ts'],
        environment: 'jsdom',
    },
});
