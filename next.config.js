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
                hostname: 'uat-apidb.musense.tw',
                port: '',
                pathname: '/home/**',
            },
            {
                protocol: 'https',
                hostname: 'bd.musense.tw',
                port: '',
                pathname: '/home/**',
            },
            {
                protocol: 'https',
                hostname: 'www.youtube.com',
                port: '',
                pathname: '/embed/**',
            },
        ]
    },
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },
}

module.exports = nextConfig
