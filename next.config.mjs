import path from 'path';
import { fileURLToPath } from 'url';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com',
			},
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
			},
			{
				protocol: 'https',
				hostname: 'ucarecdn.com',
			},
			{
				protocol: 'https',
				hostname: 'plus.unsplash.com',
			},
		],
	},
	webpack: (config, { isServer }) => {
    const __filename = fileURLToPath(import.meta.url);
		const __dirname = path.dirname(__filename);
		if (!isServer) {
			// Ensure that all imports of 'yjs' resolve to the same instance
			config.resolve.alias['yjs'] = path.resolve(__dirname, 'node_modules/yjs');
		}
		return config;
	},
};

export default nextConfig;
