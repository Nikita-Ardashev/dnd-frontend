import fs from 'node:fs/promises';
import path from 'node:path';

const [, , layer, sliceName] = process.argv;

if (!layer || !sliceName) {
	console.error('Usage: node scripts/create-slice.mjs <layer> <slice-name>');
	console.error('Example: node scripts/create-slice.mjs features test-test');
	process.exit(1);
}

const allowedLayers = ['app', 'pages', 'widgets', 'features', 'entities', 'shared'];

if (!allowedLayers.includes(layer)) {
	console.error(`Layer must be one of: ${allowedLayers.join(', ')}`);
	process.exit(1);
}

const isKebab = /^[a-z0-9]+(-[a-z0-9]+)*$/.test(sliceName);

if (!isKebab) {
	console.error('Slice name must be kebab-case, for example: test-test');
	process.exit(1);
}

const toPascalCase = (value) =>
	value
		.split('-')
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join('');

const componentName = toPascalCase(sliceName);
const sliceDir = path.join(process.cwd(), 'src', layer, sliceName);

const files = {
	// Остальные сегменты (model, api, lib, config) создаются по мере необходимости:
	// пустые сегменты FSD не нужны.
	[`ui/${sliceName}.tsx`]: `export const ${componentName} = () => {
	return <div>${sliceName}</div>;
};
`,
	'ui/index.ts': `export * from './${sliceName}';
`,
	'index.ts': `export * from './ui';
`,
};

for (const [filePath, content] of Object.entries(files)) {
	const fullPath = path.join(sliceDir, filePath);

	try {
		await fs.mkdir(path.dirname(fullPath), { recursive: true });
		await fs.writeFile(fullPath, content, { flag: 'wx' });
		console.log(`Created ${path.relative(process.cwd(), fullPath)}`);
	} catch (error) {
		if (error.code === 'EEXIST') {
			console.log(`Skipped ${path.relative(process.cwd(), fullPath)} already exists`);
			continue;
		}

		throw error;
	}
}
