'use client';

import { ReactNode } from 'react';

import { StoreContext } from '@/shared/lib/mst';

import { RootStore } from '../store';

export const StoreProvider = ({ children }: { children: ReactNode }) => {
	return <StoreContext.Provider value={RootStore}>{children}</StoreContext.Provider>;
};
