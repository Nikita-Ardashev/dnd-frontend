'use client';
import { useTexture } from '@react-three/drei';
import { FrontSide, MeshStandardMaterialParameters } from 'three';
import { ITextureMap } from '../model';

interface IProps {
	isHovered?: boolean;
	isTransparent?: boolean;
	textureUrls?: ITextureMap;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validateItems = <T extends Record<string, any>>(textureUrls?: T) => {
	const urls: Record<string, string> = {};
	for (const key in textureUrls) {
		const url = textureUrls[key as keyof ITextureMap];
		if (url === undefined || url === null) continue;
		urls[key] = url;
	}
	return urls;
};

export const BuildingCubeTexture = function BuildingCubeTexture({
	textureUrls,
	isHovered = false,
	isTransparent = false,
}: IProps) {
	const filteredTextureUrls = validateItems(textureUrls);
	const hasTextures = Object.keys(filteredTextureUrls).length > 0;

	const loadedTextures = useTexture(filteredTextureUrls);

	if (hasTextures) {
		return <meshStandardMaterial {...loadedTextures} />;
	}

	const material: MeshStandardMaterialParameters = {
		transparent: isTransparent,
		opacity: isTransparent ? 0.5 : 1,
		side: FrontSide,
		color: !isTransparent && isHovered ? '#89656A' : 'gray',
	};

	return <meshStandardMaterial {...material} />;
};
