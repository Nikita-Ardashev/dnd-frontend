import type { NextConfig } from 'next';
import path from 'path';
const nextConfig: NextConfig = {
	sassOptions: {
		includePaths: [path.join(__dirname, 'src/styles')],
	},
	experimental: {
		optimizeCss: true,
	},
	images: {
		dangerouslyAllowSVG: true,
		contentDispositionType: 'attachment',
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
	},
};

export default nextConfig;
