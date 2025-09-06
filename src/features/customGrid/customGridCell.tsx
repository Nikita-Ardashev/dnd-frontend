'use client';

import { StoreScene } from '@/stores/scene/scene.store';
import { ThreeElements, ThreeEvent } from '@react-three/fiber';
import React, { useState } from 'react';
import { BoxGeometry, FrontSide, MeshBasicMaterial, Vector3 } from 'three';

type TMesh = ThreeElements['mesh'];

interface ICustomGridCell extends TMesh {
	cellId: string;
}

type TSideClick = 'right' | 'left' | 'top' | 'bottom' | 'front' | 'back' | 'unknown';

const getSideFromNormal = (normal: Vector3): TSideClick => {
	const tolerance = 0.001;
	const { x, y, z } = normal;

	if (Math.abs(x - 1) < tolerance) return 'right';
	if (Math.abs(x + 1) < tolerance) return 'left';
	if (Math.abs(y - 1) < tolerance) return 'top';
	if (Math.abs(y + 1) < tolerance) return 'bottom';
	if (Math.abs(z - 1) < tolerance) return 'front';
	if (Math.abs(z + 1) < tolerance) return 'back';

	return 'unknown';
};

const createCell = (side: TSideClick, parentCellPosition: Vector3) => {
	const position = new Vector3(
		parentCellPosition.x,
		parentCellPosition.y,
		parentCellPosition.z,
	);

	const handler: Record<TSideClick, () => void> = {
		front: () => {
			position.setZ(position.z + 1);
		},
		back: () => {
			position.setZ(position.z - 1);
		},
		top: () => {
			position.setY(position.y - 1);
		},
		bottom: () => {
			position.setY(position.y + 1);
		},
		left: () => {
			position.setX(position.x - 1);
		},
		right: () => {
			position.setX(position.x + 1);
		},
		unknown: () => {
			throw new Error('Не удалось создать ячейку сцены.');
		},
	};
	handler[side]();
	return position;
};

export function CustomGridCell({ cellId, ...meshProps }: ICustomGridCell) {
	const [isHovered, setHovered] = useState(false);

	const geometry = new BoxGeometry(1, 1);
	const materialWireframe = new MeshBasicMaterial({
		transparent: true,
		opacity: 0.5,
		wireframe: true,
		side: FrontSide,
		color: isHovered ? 'blue' : 'red',
	});
	const materialCube = new MeshBasicMaterial({
		side: FrontSide,
		color: 'black',
	});

	const handlerPointerOver = (e: ThreeEvent<PointerEvent>) => {
		e.stopPropagation();
		setHovered(true);
	};
	const handlerPointerOut = (e: ThreeEvent<PointerEvent>) => {
		e.stopPropagation();
		setHovered(false);
	};

	const handlerOnClickLeft = (e: ThreeEvent<PointerEvent>) => {
		e.stopPropagation();
		if (e.normal === undefined) return;
		const side = getSideFromNormal(e.normal);
		const { x, y, z } = createCell(side, e.object.position);
		const position = { x, y, z };
		StoreScene.grid.addCell(position);
	};

	const handleOnClickRight = () => {
		StoreScene.grid.removeCell(cellId);
	};

	return (
		<group
			onPointerOver={handlerPointerOver}
			onPointerOut={handlerPointerOut}
			onClick={handlerOnClickLeft}
			onContextMenu={handleOnClickRight}
		>
			<mesh material={materialCube} geometry={geometry} {...meshProps} />
			<mesh material={materialWireframe} geometry={geometry} {...meshProps}></mesh>
		</group>
	);
}
