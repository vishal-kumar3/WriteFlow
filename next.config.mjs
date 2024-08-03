/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: "images.unsplash.com"
      },
      {
        protocol: 'https',
        hostname: "ucarecdn.com"
      },
      {
        protocol: 'https',
        hostname: "plus.unsplash.com",
      }
    ],
  },
};

export default nextConfig;
