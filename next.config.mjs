import './envs.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
    poweredByHeader: false,
    reactStrictMode: true,
    experimental: {
        typedRoutes: true,
    }
};

export default nextConfig;
