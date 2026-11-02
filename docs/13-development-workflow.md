# 13. Процесс разработки

## Скрипты

| Команда | Что делает |
|---|---|
| `npm run dev` | Dev-сервер на Turbopack |
| `npm run build` / `npm start` | Production-сборка и запуск |
| `npm run lint` | ESLint по всему проекту (включая FSD-границы) |
| `npm run fsd` | Steiger — структурная проверка FSD |
| `npm run prettier:check` / `prettier:write` | Проверка/форматирование Prettier |
| `node scripts/create-slice.mjs <layer> <name>` | Генерация нового FSD-слайса |

> [!NOTE]
> `prettier:*` сейчас проверяют только файлы в корне (`./*.{...}`), без `src/`. Для всего проекта нужен глоб `"./**/*.{...}"`.

## Генератор слайсов `create-slice`

```bash
node scripts/create-slice.mjs features select-tool
```

Скрипт валидирует аргументы и создаёт минимальный каркас слайса:

```
src/features/select-tool/
├── index.ts              # export * from './ui'
├── api/index.ts          # пусто
├── model/index.ts        # пусто
└── ui/
    ├── index.ts          # export * from './select-tool'
    └── select-tool.tsx   # export const SelectTool = (props: IProps) => <div>select-tool</div>
```

Правила:

- `layer` — один из `app`, `pages`, `widgets`, `features`, `entities`, `shared`.
- `name` — строго kebab-case (`/^[a-z0-9]+(-[a-z0-9]+)*$/`); имя компонента — PascalCase от него.
- Существующие файлы **не перезаписываются** (флаг `wx`) — скрипт можно безопасно запускать повторно, чтобы дозаполнить недостающие файлы.
- Компонент создаётся с **именованным экспортом** — так баррель `export *` работает без исключений.

> [!TIP]
> Для `shared` скрипт создаёт сегменты `api/`, `model/`, `ui/`, хотя в `shared` слайсов нет — там сегменты лежат напрямую (`shared/ui/button`). Для shared-компонентов используйте процедуру из [UI-кита](./11-ui-kit.md).

## Чек-лист: новая фича

1. **Определить слой.**
   - Действие пользователя над сущностью (выбрать инструмент, загрузить модель) → `features`.
   - Самостоятельный блок интерфейса из нескольких фич/сущностей → `widgets`.
   - Новая предметная модель (персонаж, заметка, слой) → `entities`.
2. **Сгенерировать каркас** через `create-slice`.
3. **Модель данных.** Если данные нужны нескольким слайсам или должны попасть в историю — MST-модель в `entities/*/model`, подключённая в `Root` (`src/app/store.ts`). Иначе — локальное состояние.
4. **Доступ к стору** — только через `useStore` / `useStoreScene` / `useStoreProfile`; компонент оборачивается в `observer()`.
5. **Публичный API.** Всё, что нужно снаружи, экспортировать из `index.ts`. Импорт снаружи — только `@/<layer>/<slice>`.
6. **Связь между entities** — только через `entities/<name>/@x/<consumer>.ts`.
7. **Подключение на страницу** — в `pages/*/ui`, при необходимости через слот-пропсы виджета (как `toolbar` у `Scene`).
8. **Проверки** перед коммитом:

```bash
npm run lint
```

```bash
npm run fsd
```

## Чек-лист: новая MST-сущность

```typescript
// entities/note/model/note.model.ts
import { t } from 'mobx-state-tree'

export const MNote = t
  .model('Note', {
    id: t.identifier,
    text: t.optional(t.string, ''),
  })
  .actions((self) => ({
    setText(text: string) { self.text = text },
  }))
```

- Префикс `M` для MST-моделей (`MMesh`, `MCubeMesh`, `MTexture`), типы снапшотов — `T*` через `SnapshotOut<typeof M*>`.
- Общие поля выносить в базовую модель и расширять через `t.compose` (`MMesh → MModelMesh → MModelInternalMesh`).
- Переиспользуемое поведение — миксинами в `shared/lib/mst` (`withMatrix4`), применяемыми поверх `compose`.
- Если структура уже описана Zod-схемой (например, ответ API), модель можно получить через `zodToMst(schema, 'Name')`.
- Нужен undo/redo — добавить путь сущности в `withHistory(...)` в `src/app/store.ts`.

## Соглашения об именовании

| Что | Формат | Пример |
|---|---|---|
| Директории слайсов и сегментов | kebab-case | `scene-viewport`, `hidden-sidebar` |
| Файлы компонентов | kebab-case | `building-cube.tsx` |
| Файлы моделей | `*.model.ts` или kebab-case | `scene.model.ts`, `cube-mesh.ts` |
| Компоненты | PascalCase, именованный экспорт | `export const ToolbarScene` |
| Пропсы | `I*Props` / `IProps` | `ILayersProps` |
| Типы | `T*` | `TTabs`, `TModelExternalMesh` |
| SASS-классы | kebab-case + BEM-модификаторы | `.button-wrapper--close`, `scene__is_move` |

> [!WARNING]
> На Windows файловая система нечувствительна к регистру. Переименование `Layers.tsx → layers.tsx` git может не заметить — используйте `git mv -f Layers.tsx layers.tsx`, иначе на Linux/CI импорт `./layers` сломается.
