# 📚 Архитектурная документация DnD-frontend

Документация описывает архитектурные решения проекта — 3D-редактора сцен для настольных D&D-игр.

## Содержание

| Документ | Описание |
|---|---|
| [Обзор проекта](./01-project-overview.md) | Общее описание, стек технологий, структура проекта |
| [Feature-Sliced Design](./02-feature-sliced-design.md) | Архитектурная методология и правила слоёв |
| [Управление состоянием](./03-state-management.md) | MobX-State-Tree, модели, миксины, undo/redo |
| [3D-движок и сцена](./04-3d-engine.md) | React Three Fiber, компоненты сцены, инструменты |
| [Стилизация](./05-styling.md) | Tailwind CSS v4, CSS/SASS Modules, темизация |
| [Сетевой слой и аутентификация](./06-api-and-auth.md) | TanStack Query, Axios, NextAuth.js, Yandex OAuth |
| [Производительность и оптимизации](./07-performance.md) | React Compiler, Turbopack, кэширование, MobX-реактивность |
| [Линтинг и качество кода](./08-linting-and-quality.md) | ESLint, Steiger, TypeScript strict, границы слоёв |
| [ADR — Архитектурные решения](./09-adr.md) | Лог ключевых архитектурных решений и обоснований |
| [Роутинг и компоновка](./10-routing-and-layout.md) | App Router vs FSD `app`, API-прокси, раскладка страницы Platform |
| [UI-кит](./11-ui-kit.md) | `shared/ui`: обёртки Base UI, HiddenSidebar, добавление компонентов |
| [Потоки данных](./12-data-flow.md) | Сценарии: инструменты, строительство, трансформация, undo/redo |
| [Процесс разработки](./13-development-workflow.md) | Скрипты, генератор слайсов, чек-листы, соглашения об именовании |
| [Правила FSD](./14-fsd-rules.md) | Обязательные правила слоёв, сегментов, публичного API и чек-лист ревью |

---

> **Актуально на:** ноябрь 2026  
> **Версия Next.js:** 16 · **React:** 19 · **TypeScript:** 5.9
