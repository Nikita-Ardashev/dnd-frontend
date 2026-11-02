import { useStore } from '@/shared/lib/mst';

export const useStoreProfile = () => {
	const { profile } = useStore();
	return profile;
};
