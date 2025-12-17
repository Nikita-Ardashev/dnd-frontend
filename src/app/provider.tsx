'use client';

import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StoreProfile } from '@/stores/storeProfile/profile.store';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { useEffect, useState } from 'react';

const createQueryClient = new QueryClient({
	defaultOptions: {
		queries: {
			gcTime: 1000 * 60 * 60 * 24,
		},
	},
});

export function Providers({ children }: { children: React.ReactNode }) {
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

	const { expires, ...user } = StoreProfile;
	const session = expires === null ? null : { expires: expires.toString(), user };

	return (
		<QueryClientProvider client={queryClient}>
			<SessionProvider session={session}>{children}</SessionProvider>
		</QueryClientProvider>
	);
}
