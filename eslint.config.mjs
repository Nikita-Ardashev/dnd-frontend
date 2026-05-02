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
const FSD_IMPORT_RULES = [
	{ from: 'app', allow: ['pages', 'widgets', 'features', 'entities', 'shared'] },
	{ from: 'pages', allow: ['widgets', 'features', 'entities', 'shared'] },
	{ from: 'widgets', allow: ['features', 'entities', 'shared'] },
	{ from: 'features', allow: ['entities', 'shared'] },
	{ from: 'entities', allow: ['entities', 'shared'] },
	{ from: 'shared', allow: [] },
];

const eslintConfig = [
	...compat.extends('next/core-web-vitals', 'next/typescript'),

	// FSD: изоляция слоёв
	{
		plugins: { boundaries },
		settings: {
			'boundaries/elements': FSD_LAYERS,
		},
		rules: {
			// Запрет импортов вверх по иерархии слоёв
			'boundaries/element-types': [
				'error',
				{
					default: 'disallow',
					rules: FSD_IMPORT_RULES,
				},
			],

			// Запрет импортов во внутренние сегменты чужого слайса
			'boundaries/no-private': 'error',
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
