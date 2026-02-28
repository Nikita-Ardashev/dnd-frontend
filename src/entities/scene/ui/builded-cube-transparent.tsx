'use client';

import { ThreeElements, ThreeEvent } from '@react-three/fiber';
import { useState } from 'react';
import { BoxGeometry, Vector3 } from 'three';
import { BuildingCubeTexture } from './building-cube-texture';
import { observer } from 'mobx-react-lite';
import { useCursor } from '@react-three/drei';
import { useStoreScene } from '@/shared/lib/mst/hooks';

type TMesh = ThreeElements['mesh'];

interface IProps {
	cellPosition: number[] | null;
	meshProps?: TMesh;
}

const defaultGeometry = new BoxGeometry(1, 1);

export const BuildingCubeTransparent = observer(function BuildingCubeTransparent({
	cellPosition,
	meshProps,
}: IProps) {
	const scene = useStoreScene();

	const { isNewBuild } = scene.tools.getCurrent;
	const [isHovered, setHovered] = useState(false);

	useCursor(isHovered);

	if (!isNewBuild || cellPosition === null) return;

	const handlerPointerOver = (e: ThreeEvent<PointerEvent>) => {
		if (!isNewBuild) return;
		e.stopPropagation();
		setHovered(true);
	};
	const handlerPointerOut = (e: ThreeEvent<PointerEvent>) => {
		if (!isNewBuild) return;
		e.stopPropagation();
		setHovered(false);
	};

	const handlerOnClickLeft = (e: ThreeEvent<PointerEvent>) => {
		if (!isNewBuild) return;
		e.stopPropagation();
		scene.construct.addCell(cellPosition);
	};

	return (
		<mesh
			geometry={defaultGeometry}
			position={new Vector3(...cellPosition)}
			onPointerOver={handlerPointerOver}
			onPointerOut={handlerPointerOut}
			onClick={handlerOnClickLeft}
			{...meshProps}
		>
			<BuildingCubeTexture isHovered={isHovered} isTransparent />
		</mesh>
	);
});
