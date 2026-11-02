import axios from 'axios';
export const apiUploadModels = async (fileName: string, file: Uint8Array<ArrayBuffer>) => {
	const response = await axios.post(`/api/models?folder=${fileName}`, file);
	return response;
};
