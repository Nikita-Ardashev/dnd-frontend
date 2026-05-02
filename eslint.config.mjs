import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import boundaries from 'eslint-plugin-boundaries';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

// Слои FSD в порядке убывания ответственности
const FSD_LAYERS = [
	{ type: 'app', pattern: 'src/app/**/*' },
	{ type: 'pages', pattern: 'src/pages/**/*' },
	{ type: 'widgets', pattern: 'src/widgets/**/*' },
	{ type: 'features', pattern: 'src/features/**/*' },
	{ type: 'entities', pattern: 'src/entities/**/*' },
	{ type: 'shared', pattern: 'src/shared/**/*' },
];

// Каждый слой может импортировать только из слоёв ниже себя.
// entities → entities разрешено на уровне boundaries (для @x/-паттерна),
// дополнительно ограничивается через no-restricted-imports ниже.
// v6-синтаксис: object-based селекторы { type: ... }
const FSD_IMPORT_RULES = [
	{
		from: { type: 'app' },
		allow: { to: { type: ['pages', 'widgets', 'features', 'entities', 'shared'] } },
	},
	{
		from: { type: 'pages' },
		allow: { to: { type: ['widgets', 'features', 'entities', 'shared'] } },
	},
	{
		from: { type: 'widgets' },
		allow: { to: { type: ['features', 'entities', 'shared'] } },
	},
	{
		from: { type: 'features' },
		allow: { to: { type: ['entities', 'shared'] } },
	},
	{
		from: { type: 'entities' },
		allow: { to: { type: ['entities', 'shared'] } },
	},
	{
		from: { type: 'shared' },
		allow: { to: { type: 'shared' } },
	},
];

const eslintConfig = [
	// Глобальный ignore: не линтить артефакты сборки и сторонний код
	{
		ignores: [
			'.next/**',
			'out/**',
			'public/**',
			'node_modules/**',
			'scripts/**',
			'.claude/**',
		],
	},

	...compat.extends('next/core-web-vitals', 'next/typescript'),

	// FSD: изоляция слоёв
	{
		plugins: { boundaries },
		settings: {
			'boundaries/elements': FSD_LAYERS,
		},
		rules: {
			// Запрет импортов вверх по иерархии слоёв (v6: dependencies вместо element-types).
			// Запрет импорта во внутренние сегменты чужого слайса (no-private)
			// обеспечивается steiger'ом через fsd/no-public-api-sidestep.
			'boundaries/dependencies': [
				'error',
				{
					default: 'disallow',
					rules: FSD_IMPORT_RULES,
				},
			],
		},
	},

	// Запрет относительных переходов между слоями (заставляет использовать @/)
	{
		rules: {
			'no-restricted-imports': [
				'error',
				{
					patterns: [
						{
							group: [
								'../**/app/**',
								'../**/pages/**',
								'../**/widgets/**',
								'../**/features/**',
								'../**/entities/**',
								'../**/shared/**',
							],
							message:
								'Используй абсолютный импорт через @/ вместо относительного пути между слоями FSD.',
						},
					],
				},
			],
		},
	},

	// FSD: cross-entity импорты разрешены ТОЛЬКО через @x/.
	// Применяется к файлам внутри entities, кроме самих @x/-файлов.
	{
		files: ['src/entities/**/*.{ts,tsx}'],
		ignores: ['src/entities/*/@x/**'],
		rules: {
			'no-restricted-imports': [
				'error',
				{
					patterns: [
						{
							// Любой @/entities/<что-угодно>, где путь не содержит /@x/
							regex: '^@/entities/[^/]+(?:/(?!@x/).*)?$',
							message:
								'Cross-entity импорты должны идти через @x/ (FSD): @/entities/<slice>/@x/<other-slice>',
						},
					],
				},
			],
		},
	},
];

export default eslintConfig;
