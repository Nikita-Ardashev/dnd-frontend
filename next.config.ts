import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
	turbopack: {},
	sassOptions: {
		prependData: `@use '@app/styles/variables' as v`,
	},
	experimental: {
		optimizeCss: true,
	},
	images: {
		dangerouslyAllowSVG: true,
		contentDispositionType: 'attachment',
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
	},
	reactCompiler: true,
};

export default nextConfig;
