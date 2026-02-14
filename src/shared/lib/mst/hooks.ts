import { ContextStore } from '@/app/providers/store';
import { useContext } from 'react';

export const useStore = () => {
	const store = useContext(ContextStore);
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
