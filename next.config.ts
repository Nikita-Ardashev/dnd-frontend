import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
	sassOptions: {
		includePaths: [path.join(__dirname, 'src/styles')],
	},
	experimental: {
		optimizeCss: true,
	},
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: `${process.env.APP_URL}/api/:path*`,
			},
			{
				source: '/models/:path*',
				destination: `${process.env.SRC_MODELS}/models/:path*`,
			},
		];
	},
	images: {
		dangerouslyAllowSVG: true,
		contentDispositionType: 'attachment',
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
	},
};

export default nextConfig;
