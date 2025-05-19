import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'utfs.io',
				port: '',
				search: '',
			},
			{
				protocol: 'https',
				hostname: '**.ufs.sh',
				port: '',
				search: '',
			},
		],
	},
};

export default nextConfig;
