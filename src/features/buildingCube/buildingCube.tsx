'use client';

import { StoreScene } from '@/stores/storeScene/scene.store';
import { ITextureMap } from '@/stores/storeScene/sceneCube.model';
import { getCubePosition, IReturnCubePosition } from '@/utils/getCubePositionBasedSide';
import { ThreeElements, ThreeEvent } from '@react-three/fiber';
import { useState } from 'react';
import { BoxGeometry } from 'three';
import { BuildingCubeTexture } from './buildingCubeTexture';
import { observer } from 'mobx-react-lite';
import { StoreSceneTools } from '@/stores/storeSceneTools/storeSceneTools.store';
import { BuildingCubeSide } from './buildingCubeSide';
import { useCursor } from '@react-three/drei';

type TMesh = ThreeElements['mesh'];

interface IProps extends TMesh {
	cubeId: string;
	isTransparent?: boolean;
	textureUrls?: ITextureMap;
}

const defaultGeometry = new BoxGeometry(1, 1);

export const BuildingCube = observer(function BuildingCube({
	cubeId,
	isTransparent,
	textureUrls,
	...meshProps
}: IProps) {
	const { isBuild, isNewBuild } = StoreSceneTools.getCurrent;
	const isFullBuild = isBuild || isNewBuild;
	const [isHovered, setHovered] = useState(false);

	useCursor(isHovered);

	const [newCubePosition, setNewCubePosition] = useState<IReturnCubePosition | null>(
		null,
	);

	const handlerPointerOver = (e: ThreeEvent<PointerEvent>) => {
		if (!isFullBuild) return;
		e.stopPropagation();
		setHovered(true);
	};
	const handlerPointerOut = (e: ThreeEvent<PointerEvent>) => {
		if (!isFullBuild) return;
		e.stopPropagation();
		setHovered(false);
	};
	const handlerPointerMove = (e: ThreeEvent<PointerEvent>) => {
		if (!isBuild) return;
		e.stopPropagation();
		if (e.normal === undefined) return;
		const cubePosition = getCubePosition(e.normal, e.object.position);
		setNewCubePosition(cubePosition);
	};

	const handlerOnClickLeft = (e: ThreeEvent<PointerEvent>) => {
		if (!isFullBuild) return;
		e.stopPropagation();

		if (isTransparent && Array.isArray(meshProps.position)) {
			const position = meshProps.position;
			StoreScene.sceneCubes.addCell({
				x: position[0],
				y: position[1],
				z: position[2],
			});
			return;
		}
		if (newCubePosition === null) return;
		StoreScene.sceneCubes.addCell({
			x: newCubePosition.position.x,
			y: newCubePosition.position.y,
			z: newCubePosition.position.z,
		});
	};

	const handleOnClickRight = (e: ThreeEvent<PointerEvent>) => {
		if (!isFullBuild) return;
		e.stopPropagation();
		StoreScene.sceneCubes.removeCell(cubeId);
	};

	return (
		<group>
			<mesh
				geometry={defaultGeometry}
				{...meshProps}
				onPointerOver={handlerPointerOver}
				onPointerOut={handlerPointerOut}
				onClick={handlerOnClickLeft}
				onContextMenu={handleOnClickRight}
				onPointerMove={handlerPointerMove}
			>
				<BuildingCubeTexture
					isHovered={isHovered}
					isTransparent={isTransparent}
					textureUrls={textureUrls}
				/>
			</mesh>
			{!isTransparent &&
				isBuild &&
				isHovered &&
				newCubePosition !== null &&
				newCubePosition?.side !== 'unknown' && (
					<BuildingCubeSide planePosition={newCubePosition} />
				)}
		</group>
	);
});
