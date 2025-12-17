'use client';
import { TypesTextureMap } from '@/stores/storeScene/sceneCube.model';
import { useTexture } from '@react-three/drei';
import { observer } from 'mobx-react-lite';

export const BuildingCubeTexture = observer(function BuildingCubeTexture({
	textureUrls,
}: {
	textureUrls: Partial<Record<keyof TypesTextureMap, string>>;
}) {
	const loadedTextures = useTexture(textureUrls);

	return <meshStandardMaterial {...loadedTextures} />;
});
