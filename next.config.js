/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        dirs: ['app', 'utils', 'components', 'redux'], // Only run ESLint on the [...] directories during production builds (next build)
    },
};

module.exports = nextConfig;
