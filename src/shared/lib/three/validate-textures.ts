import { ITextureMap } from '@/entities/scene/model';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateTextures = <T extends Record<string, any>>(textureUrls?: T) => {
	const urls: Record<string, string> = {};
	for (const key in textureUrls) {
		const url = textureUrls[key as keyof ITextureMap];
		if (url === undefined || url === null) continue;
		urls[key] = url;
	}
	return urls;
};
