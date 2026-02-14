import React from 'react';
import { StoreProvider } from './store';
import { QueryProvider } from './query';
import { Provider } from './provider';

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
