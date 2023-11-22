/** @type {import('next').NextConfig} */
const webpack = require('webpack');
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com', 'placehold.jp', 'i.imgur.com', 'imgur.com', 'nurz.site'],
    },
    eslint: {
        dirs: ['app', 'utils', 'components', 'redux'], // Only run ESLint on the [...] directories during production builds (next build)
    },
    reactStrictMode: false,
    fs: false,
};

module.exports = nextConfig;
