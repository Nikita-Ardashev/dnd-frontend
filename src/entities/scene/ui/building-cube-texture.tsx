'use client';
import { useTexture } from '@react-three/drei';
import { FrontSide, MeshStandardMaterialParameters } from 'three';
import { ITextureMap } from '../model';
import { validateTextures } from '@/shared/lib/three/validate-textures';

interface IProps {
	isHovered?: boolean;
	isTransparent?: boolean;
	textureUrls?: ITextureMap;
}

export const BuildingCubeTexture = function BuildingCubeTexture({
	textureUrls,
	isHovered = false,
	isTransparent = false,
}: IProps) {
	const filteredTextureUrls = validateTextures(textureUrls);
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
