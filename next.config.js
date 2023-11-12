/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com', 'placehold.jp', 'i.imgur.com', 'imgur.com', 'be.gmooc4d.id'],
    },
    eslint: {
        dirs: ['app', 'utils', 'components', 'redux'], // Only run ESLint on the [...] directories during production builds (next build)
    },
    reactStrictMode: false,
};

module.exports = nextConfig;
