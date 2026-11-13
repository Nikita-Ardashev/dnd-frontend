'use client';
import { useTexture } from '@react-three/drei';
import { FrontSide, MeshStandardMaterialParameters } from 'three';

import { validateTextures } from '@/shared/lib/three';

import { ITextureMap } from '../model/texture';

interface IProps {
	isHovered?: boolean;
	isTransparent?: boolean;
	textures?: ITextureMap;
}

export const CubeMaterial = function CubeMaterial({
	textures,
	isHovered = false,
	isTransparent = false,
}: IProps) {
	const filteredTextureUrls = validateTextures(textures);
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
