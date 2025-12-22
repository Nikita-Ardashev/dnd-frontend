'use client';

import { StoreScene } from '@/stores/storeScene/scene.store';
import { TypesTextureMap } from '@/stores/storeScene/sceneCube.model';
import { getCubePosition } from '@/utils/getCubePositionBasedSide';
import { ThreeElements, ThreeEvent } from '@react-three/fiber';
import { useState } from 'react';
import { BoxGeometry, FrontSide, MeshBasicMaterial } from 'three';
import { BuildingCubeTexture } from './buildingCubeTexture';
import { observer } from 'mobx-react-lite';
import { StoreSceneTools } from '@/stores/storeSceneTools/storeSceneTools.store';

type TMesh = ThreeElements['mesh'];

interface IBuildCube extends TMesh {
	cubeId: string;
	isTransparent?: boolean;
	textureUrls?: TypesTextureMap;
}

const defaultGeometry = new BoxGeometry(1, 1);

const defaultMaterialCube = new MeshBasicMaterial({
	side: FrontSide,
	color: 'gray',
});

const defaultMaterialTransparent = new MeshBasicMaterial({
	transparent: true,
	opacity: 0.5,
	color: 'gray',
	side: FrontSide,
});

const validatedTextures = (textureUrls: TypesTextureMap | undefined) => {
	if (!textureUrls) return null;

	const filtered: Partial<Record<keyof TypesTextureMap, string>> = {};
	for (const [key, value] of Object.entries(textureUrls)) {
		if (value) filtered[key as keyof TypesTextureMap] = value;
	}
	return Object.keys(filtered).length > 0 ? filtered : null;
};

export const BuildingCube = observer(function BuildingCube({
	cubeId,
	isTransparent,
	textureUrls,
	...meshProps
}: IBuildCube) {
	const { isBuild } = StoreSceneTools.getCurrent;

	const [isHovered, setHovered] = useState(false);

	const validTextures = validatedTextures(textureUrls);

	const materialCube = defaultMaterialCube.clone();
	materialCube.setValues({ color: isHovered ? '#89656A' : defaultMaterialCube.color });

	const handlerPointerOver = (e: ThreeEvent<PointerEvent>) => {
		if (!isBuild) return;
		e.stopPropagation();
		setHovered(true);
	};
	const handlerPointerOut = (e: ThreeEvent<PointerEvent>) => {
		if (!isBuild) return;
		e.stopPropagation();
		setHovered(false);
	};

	const handlerOnClickLeft = (e: ThreeEvent<PointerEvent>) => {
		if (!isBuild) return;
		e.stopPropagation();
		if (e.normal === undefined) return;
		if (isTransparent && Array.isArray(meshProps.position)) {
			const position = meshProps.position;
			StoreScene.sceneCubes.addCell({
				x: position[0],
				y: position[1],
				z: position[2],
			});
			return;
		}
		const { x, y, z } = getCubePosition(e.normal, e.object.position);
		StoreScene.sceneCubes.addCell({ x, y, z });
	};

	const handleOnClickRight = (e: ThreeEvent<PointerEvent>) => {
		if (!isBuild) return;
		e.stopPropagation();
		StoreScene.sceneCubes.removeCell(cubeId);
	};

	return (
		<mesh
			material={isTransparent ? defaultMaterialTransparent : materialCube}
			geometry={defaultGeometry}
			{...meshProps}
			onPointerOver={handlerPointerOver}
			onPointerOut={handlerPointerOut}
			onClick={handlerOnClickLeft}
			onContextMenu={handleOnClickRight}
		>
			{validTextures !== null && <BuildingCubeTexture textureUrls={validTextures} />}
		</mesh>
	);
});
