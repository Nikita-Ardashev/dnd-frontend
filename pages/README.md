# pages/

Не удалять. Директория намеренно пустая.

Next.js ищет Pages Router в `pages/` или `src/pages/`. Если в корне проекта есть своя `pages/`, `src/pages/` перестаёт считаться роутером. Поэтому FSD-слой `src/pages` не превращается в набор маршрутов.

Маршруты приложения описываются в корневом `app/` (App Router). Подробнее — в [docs/10-routing-and-layout.md](../docs/10-routing-and-layout.md).
