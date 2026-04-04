// scripts/add-ui.js
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// npm автоматически собирает флаги вида --flag=value и кладет их в process.env.npm_config_flag
const component = process.env.npm_config_component;

if (!component) {
	console.error('❌ Ошибка: Не указан компонент.');
	console.error('👉 Использование: npm run ui:add --component=button');
	process.exit(1);
}

// Формируем команду
const command = `npx shadcn@latest add @roiui/${component} -p src/shared/ui/${component}`;

console.log(`🚀 Устанавливаем компонент: ${component}...`);
console.log(`> ${command}`);

try {
	// Выполняем команду, сохраняя вывод в консоль
	execSync(command, { stdio: 'inherit' });

	// Путь к папке установленного компонента
	const targetDir = path.join(process.cwd(), 'src/shared/ui', component);

	if (fs.existsSync(targetDir)) {
		const files = fs.readdirSync(targetDir);

		// 1. Обновляем импорты во всех .ts/.tsx файлах компонента
		files.forEach((file) => {
			if (file.endsWith('.tsx') || file.endsWith('.ts')) {
				const filePath = path.join(targetDir, file);
				let content = fs.readFileSync(filePath, 'utf-8');

				// Регулярка учитывает как одинарные, так и двойные кавычки
				if (content.match(/from ['"]@\/lib\/utils['"]/)) {
					content = content.replace(
						/from ['"]@\/lib\/utils['"]/g,
						"from '@lib/styles/utils'",
					);
					fs.writeFileSync(filePath, content, 'utf-8');
					console.log(`🔧 Импорт обновлен в файле: ${file}`);
				}
			}
		});

		// 2. Создаем barrel import (index.ts)
		const indexFilePath = path.join(targetDir, 'index.ts');

		// Пытаемся найти главный файл (например, button.tsx), чтобы экспортировать именно его
		const mainFile = files.find(
			(f) => f.startsWith(component) && (f.endsWith('.tsx') || f.endsWith('.ts')),
		);
		const exportName = mainFile ? mainFile.replace(/\.tsx?$/, '') : component;

		const indexContent = `export * from './${exportName}';\n`;
		fs.writeFileSync(indexFilePath, indexContent, 'utf-8');
		console.log(`📦 Добавлен barrel import в index.ts`);
	} else {
		console.warn(
			`⚠️ Папка компонента ${targetDir} не найдена. Пост-обработка пропущена.`,
		);
	}

	console.log(`✅ Компонент ${component} успешно установлен и настроен!`);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
} catch (error) {
	console.error(`❌ Ошибка при установке компонента ${component}`);
	process.exit(1);
}
