import { useContext } from 'react';

import { IStore, StoreContext } from './store-context';

export const useStore = (): IStore => {
	const store = useContext(StoreContext);
	if (!store) {
		throw new Error('useStore must be used within a StoreProvider');
	}
	return store;
};
