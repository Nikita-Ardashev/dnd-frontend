import React from 'react';

import { Provider } from './provider';
import { QueryProvider } from './query';
import { StoreProvider } from './store';

export const Providers = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<Provider>
			<StoreProvider>
				<QueryProvider>{children}</QueryProvider>
			</StoreProvider>
		</Provider>
	);
};
