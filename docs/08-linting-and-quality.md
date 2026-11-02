# 8. Линтинг и качество кода

## TypeScript Strict Mode

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2017",
    "module": "esnext",
    "moduleResolution": "bundler"
  }
}
```

### Path Aliases

| Алиас | Путь | Назначение |
|---|---|---|
| `@/*` | `./src/*` | Абсолютные импорты из src |
| `@public/*` | `./public/*` | Публичные ассеты |
| `@app/*` | `./src/app/*` | Нужен SASS: `prependData` в `next.config.ts` подключает `@app/styles/variables` |

> [!NOTE]
> В TS-коде используется только `@/*`. Алиасы `@styles`, `@stores` и `@lib` удалены вместе с webpack-алиасом `@styles` в `next.config.ts`.

## ESLint — контроль FSD-границ

### `eslint-plugin-boundaries`

Правило `boundaries/dependencies` (`default: 'disallow'`) контролирует, что каждый FSD-слой импортирует **только из нижележащих слоёв**:

```
app     → может импортировать из pages, widgets, features, entities, shared
pages   → может импортировать из widgets, features, entities, shared
widgets → может импортировать из features, entities, shared
features→ может импортировать из entities, shared
entities→ может импортировать из entities (только через @x/, см. ниже), shared
shared  → ни от кого не зависит
```

### `no-restricted-imports`

```javascript
// ❌ Запрещено — относительные импорты между слоями
import { Button } from '../../shared/ui/button'

// ✅ Только абсолютные через алиас
import { Button } from '@/shared/ui/button'
```

### Кросс-entity правило

Regex-правило разрешает импорты между entities **только через `@x/` файлы**:

```typescript
// ✅ Разрешено
import { MCubeMesh } from '@/entities/mesh/@x/scene'

// ❌ Запрещено
import { MCubeMesh } from '@/entities/mesh/model/cube-mesh'
```

## Steiger — структурный FSD-линтинг

```bash
npm run fsd  # → steiger ./src
```

Конфигурация — `steiger.config.ts`: `fsd.configs.recommended` с переопределениями:

- для `src/shared/**` отключены `fsd/public-api` и `fsd/segments-by-purpose`;
- `fsd/insignificant-slice` понижен до `warn` — чтобы WIP-слайсы не роняли проверку.

Проверяет:
- `fsd/public-api` — наличие `index.ts` в каждом слайсе
- `fsd/segments-by-purpose` — правильное назначение сегментов (`model/`, `ui/`, `api/`, `lib/`)
- `fsd/insignificant-slice` — предупреждает о слишком маленьких слайсах

## TypeScript-плагин Next.js

```json
// tsconfig.json
{
  "plugins": [{ "name": "next" }]
}
```

Это плагин Next.js для редактора (подсказки по `'use client'`, конфигам роутов и т.п.), к React Compiler он отношения не имеет. React Compiler включается опцией `reactCompiler: true` в `next.config.ts` (см. [Производительность](./07-performance.md)).

## Тестирование

> [!WARNING]
> **Тесты отсутствуют.** В проекте нет:
> - Тестового фреймворка (Jest, Vitest, Playwright, Cypress)
> - Тестовых файлов
> - Скриптов тестирования в `package.json`
>
> Рекомендуется добавить как минимум:
> - **Vitest** для unit-тестов MST-моделей
> - **React Testing Library** для компонентных тестов
> - **Playwright** для E2E-тестов критических сценариев

## Форматирование

Prettier настроен в `.prettierrc`: табы (`useTabs`, ширина 4), `printWidth: 92`, одинарные кавычки (в JSX — двойные), `trailingComma: all`, `endOfLine: lf`.

> [!WARNING]
> Скрипты `prettier:check` / `prettier:write` используют глоб `./*.{...}` — он покрывает только файлы в корне, без `src/` и `app/`. `.editorconfig` отсутствует.
