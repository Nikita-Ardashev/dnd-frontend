import { useStore } from '@/shared/lib/mst';

export const useStoreScene = () => {
	const { scene } = useStore();
	return scene;
};
