'use client';

import { ThreeElements, ThreeEvent } from '@react-three/fiber';
import { useState } from 'react';
import { BoxGeometry } from 'three';
import { BuildingCubeTexture } from './building-cube-texture';
import { observer } from 'mobx-react-lite';
import { BuildingCubeSide } from './building-cube-side';
import { useCursor } from '@react-three/drei';
import { useStoreScene } from '@/shared/lib/mst/hooks';
import {
	IReturnCubePosition,
	getCubePosition,
} from '@/shared/lib/three/get-cube-position-based-side';

type TMesh = ThreeElements['mesh'];

interface IProps {
	cubeId: string;
	meshProps?: TMesh;
}

const defaultGeometry = new BoxGeometry(1, 1);

export const BuildingCube = observer(function BuildingCube({ cubeId, meshProps }: IProps) {
	const scene = useStoreScene();
	const cube = scene.construct.getCubeById(cubeId);

	const { isBuild } = scene.tools.getCurrent;
	const [isHovered, setHovered] = useState(false);

	useCursor(isHovered);

	if (cube === undefined) {
		throw new Error(`Не удалось получить строительный куб по id: ${cubeId}`);
	}

	const position = cube.getPlacement.position;

	const [newCubePosition, setNewCubePosition] = useState<IReturnCubePosition | null>(
		null,
	);

	const textureUrls = cube.textureUrls;

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
	const handlerPointerMove = (e: ThreeEvent<PointerEvent>) => {
		if (!isBuild) return;
		e.stopPropagation();
		if (e.normal === undefined) return;
		const cubePosition = getCubePosition(e.normal, e.object.position);
		setNewCubePosition(cubePosition);
	};

	const handlerOnClickLeft = (e: ThreeEvent<PointerEvent>) => {
		if (!isBuild) return;
		e.stopPropagation();

		if (newCubePosition === null) return;

		scene.construct.addCell(newCubePosition.position.toArray());
	};

	const handleOnClickRight = (e: ThreeEvent<PointerEvent>) => {
		if (!isBuild) return;
		e.stopPropagation();
		scene.construct.removeCell(cubeId);
	};

	return (
		<group>
			<mesh
				geometry={defaultGeometry}
				onPointerOver={handlerPointerOver}
				onPointerOut={handlerPointerOut}
				onClick={handlerOnClickLeft}
				onContextMenu={handleOnClickRight}
				onPointerMove={handlerPointerMove}
				position={position}
				{...meshProps}
			>
				<BuildingCubeTexture isHovered={isHovered} textureUrls={textureUrls} />
			</mesh>
			{isBuild &&
				isHovered &&
				newCubePosition !== null &&
				newCubePosition?.side !== 'unknown' && (
					<BuildingCubeSide planePosition={newCubePosition} />
				)}
		</group>
	);
});
