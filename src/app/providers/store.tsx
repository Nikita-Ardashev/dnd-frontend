'use client';

import { ReactNode } from 'react';
import { RootStore } from '../store';
import { StoreContext } from '@/shared/lib/mst';

export const StoreProvider = ({ children }: { children: ReactNode }) => {
	return <StoreContext.Provider value={RootStore}>{children}</StoreContext.Provider>;
};
