'use client';

import { useCursor } from '@react-three/drei';
import { ThreeElements, ThreeEvent } from '@react-three/fiber';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { BoxGeometry } from 'three';

import { CubeMaterial } from '@/entities/mesh';
import { useStoreScene } from '@/entities/scene';

import { getCubePosition, IReturnCubePosition } from '../lib';
import { CubeSideHighlight } from './cube-side-highlight';

type TMesh = ThreeElements['mesh'];

interface IProps {
	cubeId: string;
	meshProps?: TMesh;
}

const defaultGeometry = new BoxGeometry(1, 1);

export const BuildableCube = observer(function BuildableCube({
	cubeId,
	meshProps,
}: IProps) {
	const scene = useStoreScene();
	const cube = scene.construct.getCubeById(cubeId);

	const isHovered = cube?.isHovered ?? false;
	const setHovered = (hovered: boolean) => {
		if (cube) {
			cube.setHovered(hovered);
		}
	};
	const [newCubePosition, setNewCubePosition] = useState<IReturnCubePosition | null>(
		null,
	);
	useCursor(isHovered, 'pointer', 'auto');

	if (cube === undefined) {
		throw new Error(`Не удалось получить строительный куб по id: ${cubeId}`);
	}

	const { isBuild } = scene.tools.getCurrent;

	const position = cube.getPlacement.position;

	const textures = cube.textures?.getTextureMap;

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
		setHovered(false);
	};

	const handleOnClickRight = (e: ThreeEvent<PointerEvent>) => {
		if (!isBuild) return;
		e.stopPropagation();
		scene.construct.removeCell(cubeId);
	};

	return (
		<>
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
					<CubeMaterial isHovered={isHovered} textures={textures} />
				</mesh>
				{isBuild &&
					isHovered &&
					newCubePosition !== null &&
					newCubePosition?.side !== 'unknown' && (
						<CubeSideHighlight planePosition={newCubePosition} />
					)}
			</group>
		</>
	);
});
