/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        DB_URL: process.env.DB_URL_SERVER,
        DEFAULT_PRODUCT: process.env.DEFAULT_PRODUCT_c,
    },
    distDir: 'build',
    output: 'standalone'
}

module.exports = nextConfig
