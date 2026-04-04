'use client';

import { ReactNode, useEffect } from 'react';
import { handlerChangeHistory } from '../store';
import { useMSTDebug } from '@/shared/lib/debug/useMSTDebug';

export const Provider = ({ children }: { children: ReactNode }) => {
	useMSTDebug();

	useEffect(() => {
		window.addEventListener('keyup', handlerChangeHistory);

		return () => {
			window.removeEventListener('keyup', handlerChangeHistory);
		};
	}, []);

	return <>{children}</>;
};
