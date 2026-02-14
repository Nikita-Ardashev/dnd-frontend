'use client';

import { createContext, ReactNode } from 'react';
import { RootStore } from '../store';

export const ContextStore = createContext(RootStore);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
	return <ContextStore.Provider value={RootStore}>{children}</ContextStore.Provider>;
};
