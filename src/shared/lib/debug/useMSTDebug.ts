/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectReduxDevtools } from 'mst-middlewares';
import { useEffect } from 'react';

export const useMSTDebug = (store: any) => {
	useEffect(() => {
		if (process.env.NODE_ENV === 'development') {
			const extension = (window as any).__REDUX_DEVTOOLS_EXTENSION__;

			if (extension) {
				const remoteDevMock = {
					connectViaExtension: (conf: any) => extension.connect(conf),
					extractState: (obj: any) => obj,
				};

				try {
					connectReduxDevtools(remoteDevMock as any, store);
					console.log('✅ MobX DevTools connected successfully');
				} catch (e) {
					console.error('❌ Failed to connect MobX DevTools:', e);
				}
			}
		}
	}, []);
};
