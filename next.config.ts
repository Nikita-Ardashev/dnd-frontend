import type { NextConfig } from 'next';
import path from 'path';
const nextConfig: NextConfig = {
	sassOptions: {
		prependData: `@use '@styles/variables' as v`,
	},
	webpack: (config) => {
		// Создаем алиас '@styles', который смотрит в папку src/styles
		config.resolve.alias['@styles'] = path.join(process.cwd(), 'src/styles');
		return config;
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
