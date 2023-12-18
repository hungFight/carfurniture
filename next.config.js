/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        DB_URL: process.env.DB_URL_SERVER,
    },
}

module.exports = nextConfig
