'use client';

import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { ReactNode, useEffect, useState } from 'react';
import { useStoreProfile } from '@/shared/lib/mst/hooks';

const createQueryClient = new QueryClient({
	defaultOptions: {
		queries: {
			gcTime: 1000 * 60 * 60 * 24,
		},
	},
});

export function QueryProvider({ children }: { children: ReactNode }) {
	const [queryClient] = useState(createQueryClient);

	useEffect(() => {
		const localStoragePersister = createSyncStoragePersister({
			storage: window.localStorage,
		});

		persistQueryClient({
			queryClient,
			persister: localStoragePersister,
			maxAge: 1000 * 60 * 60 * 24,
			hydrateOptions: {},
			dehydrateOptions: {},
		});
	}, [queryClient]);

	const { expires, ...user } = useStoreProfile();
	const session = expires === null ? null : { expires: expires.toString(), user };

	return (
		<QueryClientProvider client={queryClient}>
			<SessionProvider session={session}>{children}</SessionProvider>
		</QueryClientProvider>
	);
}
