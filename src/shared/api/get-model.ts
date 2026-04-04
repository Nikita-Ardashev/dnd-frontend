export const fetchGetModel = async (name: string, type: 'model' | 'texture') => {
	const path = type === 'model' ? `${name}.gltf` : `${name}.png`;
	const response = await fetch(`/api/models/${path}`);
	return response;
};
