# 5. Стилизация

## Обзор подхода

Проект использует **гибридную стратегию стилизации** — несколько технологий, каждая для своей задачи:

```mermaid
graph LR
    A["Tailwind CSS v4"] -->|utility classes| B["Быстрая вёрстка"]
    C["CSS Modules"] -->|.module.css| D["Изолированные стили UI"]
    E["SASS Modules"] -->|.module.sass| F["Стили виджетов"]
    G["CSS Custom Properties"] -->|var(--*)| H["Темизация light/dark"]
    I["CVA"] -->|variants| J["Вариантная система"]
    K["clsx / cn()"] -->|conditional| L["Мерж классов"]
```

## 1. Tailwind CSS v4

**CSS-first конфигурация** — без `tailwind.config.ts`:

```css
/* globals.css */
@import 'tailwindcss';
```

> [!NOTE]
> Tailwind v4 отказался от JS-конфигов. Вся кастомизация — через CSS-директивы (`@theme`, `@layer`, etc.).

## 2. CSS Modules

Используются для UI-компонентов shared-слоя:

```
shared/ui/button/button.module.css   (~290 строк)
```

Обеспечивают:

- **Изоляцию** — классы автоматически скоупятся
- **Типобезопасность** — TypeScript видит доступные классы

## 3. SASS Modules

Используются для виджетов и layout-компонентов:

```
widgets/header/ui/header.module.sass
```

Глобальные SASS-переменные автоматически подключаются в каждый SASS-файл через `next.config.ts`:

```typescript
// next.config.ts
sassOptions: {
	prependData: `@use '@app/styles/variables' as v`;
}
```

Переменные доступны с неймспейсом `v`: `v.$color-primary`.

## 4. Темизация через CSS Custom Properties

Расширенная система тем на основе **OKLCH цветового пространства**:

```css
:root {
	--background: oklch(1 0 0);
	--foreground: oklch(0.145 0 0);
	--primary: oklch(0.205 0.006 286.029);
	--card: oklch(1 0 0);
	--destructive: oklch(0.577 0.245 27.325);
	/* ... */
}

.dark,
[data-theme='dark'] {
	--background: oklch(0.145 0 0);
	--foreground: oklch(0.985 0 0);
	/* ... */
}
```

Тема переключается атрибутом `data-theme` на `<html>` (в `app/layout.tsx` жёстко задан `data-theme="dark"`); класс `.dark` поддерживается для совместимости с shadcn-компонентами.

> [!TIP]
> OKLCH обеспечивает **перцептуально однородные** цветовые переходы — `color-mix()` в OKLCH выглядит естественнее, чем в HSL/RGB.

### Progressive Enhancement

Стили разнесены по каскадным слоям `@layer fallbacks, dynamic`: в `fallbacks` — готовые OKLCH-значения, в `dynamic` — производные цвета через `color-mix()`, обёрнутые в `@supports (background: color-mix(...))`. Браузеры без `color-mix()` остаются на fallback-значениях.

## 5. CVA (Class Variance Authority)

Вариантная система для компонентов с предсказуемым API:

```typescript
// shared/ui/button/button.tsx
// Варианты — классы из CSS Module, а не Tailwind-строки
const buttonVariants = cva(styles.base, {
	variants: {
		variant: {
			primary: styles.primary,
			secondary: styles.secondary,
			destructive: styles.destructive,
			ghost: styles.ghost,
			outline: styles.outline,
			link: styles.link,
		},
		size: {
			sm: styles.sm,
			md: styles.md,
			lg: styles.lg,
			icon: styles.icon,
		},
	},
	defaultVariants: {
		variant: 'primary',
		size: 'md',
	},
});
```

## 6. `cn()` — утилита мержа классов

```typescript
// shared/lib/styles/cn.ts
import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
	return clsx(inputs);
}
```

Используется повсеместно для условного применения классов.

> [!NOTE]
> В отличие от shadcn-версии, `cn()` не использует `tailwind-merge` — конфликтующие Tailwind-классы не схлопываются, побеждает порядок в CSS.

## 7. SASS-переменные темы

```sass
// app/styles/_variables.sass
$color-primary: #600D07 !default
$color-secondary: #F4942F !default
$color-tertiary: #B65B11 !default
$color-bg-default: #332D2D !default
$color-bg-btn: #B8230D !default
$color-state-hover: #440702 !default
// ...
```

Подключаются автоматически во все SASS-файлы через `prependData` (как `v.$color-*`).

## PostCSS Pipeline

```
@tailwindcss/postcss → postcss-flexbugs-fixes → postcss-preset-env (stage 3, nesting-rules, autoprefixer)
```
