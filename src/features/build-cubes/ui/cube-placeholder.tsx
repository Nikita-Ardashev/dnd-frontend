'use client';

import { useCursor } from '@react-three/drei';
import { ThreeElements, ThreeEvent } from '@react-three/fiber';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { BoxGeometry, Vector3 } from 'three';

import { CubeMaterial } from '@/entities/mesh';
import { useStoreScene } from '@/entities/scene';

type TMesh = ThreeElements['mesh'];

interface IProps {
	cellPosition: number[] | null;
	meshProps?: TMesh;
}

const defaultGeometry = new BoxGeometry(1, 1);

export const CubePlaceholder = observer(function CubePlaceholder({
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
		setHovered(false);
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
			<CubeMaterial isHovered={isHovered} isTransparent />
		</mesh>
	);
});
