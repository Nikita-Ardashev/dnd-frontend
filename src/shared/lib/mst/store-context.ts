'use client';

import { createContext } from 'react';

/**
 * Пустой интерфейс стора — намеренно пустой.
 * Расширяется из app-слоя через module augmentation без нарушения FSD:
 * @see src/app/store.ts
 *
 * @example
 * // app/store.ts
 * declare module '@/shared/lib/mst/store-context' {
 *   interface IStore extends Instance<typeof Root> {}
 * }
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IStore {}

export const StoreContext = createContext<IStore | null>(null);
