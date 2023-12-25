/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        DB_URL: process.env.DB_URL_SERVER,
        DEFAULT_PRODUCT: process.env.DEFAULT_PRODUCT_c,
    },
<<<<<<< HEAD
=======
    // distDir: 'build',
    // output: 'standalone'
>>>>>>> ba03f58b8bd69df13cc73c77438c36187809ad78
}

module.exports = nextConfig
