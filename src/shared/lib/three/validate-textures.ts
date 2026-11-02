/** Отбрасывает пустые URL текстур, чтобы передать в useTexture только реальные карты. */
export const validateTextures = <T extends { [K in keyof T]?: string | null }>(
	textureUrls?: T,
) => {
	const urls: Record<string, string> = {};
	for (const key in textureUrls) {
		const url = textureUrls[key];
		if (url === undefined || url === null) continue;
		urls[key] = url;
	}
	return urls;
};
