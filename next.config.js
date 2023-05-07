/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  publicRuntimeConfig: {
      apiUrl: process.env.NODE_ENV === 'development'
          ? 'http://localhost:3001/api' // development api
          : 'http://localhost:3001/api' // production api
  },
  images: {
    domains: ['imgur.com', 'via.placeholder.com'],
  },
}

module.exports = nextConfig
