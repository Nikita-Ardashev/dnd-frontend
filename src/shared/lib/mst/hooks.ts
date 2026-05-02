import { useContext } from 'react';
import { IStore, StoreContext } from './store-context';

export const useStore = (): IStore => {
	const store = useContext(StoreContext);
	if (!store) {
		throw new Error('useStore must be used within a StoreProvider');
	}
	return store;
};

export const useStoreScene = () => {
	const { scene } = useStore();
	return scene;
};

export const useStoreProfile = () => {
	const { profile } = useStore();
	return profile;
};
