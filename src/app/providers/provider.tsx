'use client';

import { ReactNode, useEffect } from 'react';
import { handlerChangeHistory } from '../store';
import { useMSTDebug } from '@/shared/lib/debug/useMSTDebug';

export const Provider = ({ children }: { children: ReactNode }) => {
	useMSTDebug();

	useEffect(() => {
		window.onkeyup = handlerChangeHistory;
	}, []);

	return <>{children}</>;
};
