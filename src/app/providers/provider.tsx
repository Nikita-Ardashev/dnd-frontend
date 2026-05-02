'use client';

import { ReactNode, useEffect } from 'react';
import { handlerChangeHistory, RootStore } from '../store';
import { useMSTDebug } from '@/shared/lib/debug';

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
