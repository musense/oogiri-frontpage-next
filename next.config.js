/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    trailingSlash: false,
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '10.88.0.106',
                port: '4200',
                pathname: '/images/**',
            },
            {
                protocol: 'http',
                hostname: '10.88.0.106',
                port: '4200',
                pathname: '/saved_image/**',
            },
            {
                protocol: 'http',
                hostname: '10.88.0.106',
                port: '4200',
                pathname: '/saved_image/**',
            },
            {
                protocol: 'https',
                hostname: 'i.ytimg.com',
                port: '',
                pathname: '/vi/**',
            },
            {
                protocol: 'http',
                hostname: 'uat-apidb.oogiriinfo.com',
                port: '',
                pathname: '/home/**',
            },
            {
                protocol: 'https',
                hostname: 'bd.oogiriinfo.com',
                port: '',
                pathname: '/home/**',
            },
        ]
    },
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },
}

module.exports = nextConfig
