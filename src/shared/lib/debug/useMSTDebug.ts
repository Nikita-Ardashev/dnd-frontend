/* eslint-disable @typescript-eslint/no-explicit-any */
import { RootStore } from '@/app/store';
import { connectReduxDevtools } from 'mst-middlewares';
import { useEffect } from 'react';

export const useMSTDebug = () => {
	useEffect(() => {
		if (process.env.NODE_ENV === 'development') {
			// Проверяем наличие расширения в браузере
			const extension = (window as any).__REDUX_DEVTOOLS_EXTENSION__;

			if (extension) {
				// Создаем мок-объект, который прикидывается библиотекой remotedev
				const remoteDevMock = {
					connectViaExtension: (conf: any) => extension.connect(conf),
					extractState: (obj: any) => obj,
					// Добавьте другие методы, если mst-middlewares их потребует
				};

				try {
					// Передаем наш мок вместо отсутствующей библиотеки
					connectReduxDevtools(remoteDevMock as any, RootStore);
					console.log('✅ MobX DevTools connected successfully');
				} catch (e) {
					console.error('❌ Failed to connect MobX DevTools:', e);
				}
			}
		}
	}, []);
};
