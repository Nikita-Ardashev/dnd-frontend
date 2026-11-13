'use client';

import { ReactNode, useEffect } from 'react';

import { useMSTDebug } from '@/shared/lib/mst';

import { handlerChangeHistory, RootStore } from '../store';

export const Provider = ({ children }: { children: ReactNode }) => {
	useMSTDebug(RootStore);

	useEffect(() => {
		window.addEventListener('keyup', handlerChangeHistory);

		return () => {
			window.removeEventListener('keyup', handlerChangeHistory);
		};
	}, []);

	return <>{children}</>;
};
