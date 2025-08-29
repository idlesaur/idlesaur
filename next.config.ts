import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    devIndicators: false,
    experimental: {
        ppr: 'incremental',
    },
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
            { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
        ],
    },
};

export default nextConfig;
