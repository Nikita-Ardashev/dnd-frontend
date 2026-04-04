# Установка компонентов shadcn

## Roiui

### 1. Что бы установить новый компонент из библиотеки roiui нужно выполнить команду:

```bash
npx shadcn@latest add @roiui/[component] -p src/shared/ui/[component]
```

Например:

```bash
npx shadcn@latest add @roiui/button -p src/shared/ui/button
```

### 2. В созданном файле компонента нужно заменить путь до **cn**.

Как было:

```ts
import { cn } from '@/lib/utils';
```

Как стало:

```ts
import { cn } from '@lib/shadcn/utils';
```

### 3. Также нужно создать **barrel** импорт, а не импортировать на прямую!
