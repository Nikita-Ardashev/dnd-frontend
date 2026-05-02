import { defineConfig } from 'steiger';
import fsd from '@feature-sliced/steiger-plugin';

export default defineConfig([
	...fsd.configs.recommended,
	{
		files: ['./src/shared/**'],
		rules: {
			'fsd/public-api': 'off',
			// shared не имеет слайсов — сегменты могут называться произвольно
			'fsd/segments-by-purpose': 'off',
		},
	},
	{
		// WIP-слайсы без рефёренсов — предупреждение вместо ошибки
		files: ['./src/**'],
		rules: {
			'fsd/insignificant-slice': 'warn',
		},
	},
]);
