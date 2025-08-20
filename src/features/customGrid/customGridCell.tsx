'use client';

import { ThreeElements, ThreeEvent } from '@react-three/fiber';
import React, { useState } from 'react';
import { BoxGeometry, FrontSide, MeshBasicMaterial } from 'three';

type TMesh = ThreeElements['mesh'];

interface ICustomGridCell extends TMesh {
	size?: number;
}

export function CustomGridCell({ size = 1, ...meshProps }: ICustomGridCell) {
	const [isHovered, setHovered] = useState(false);

	const geometry: BoxGeometry = new BoxGeometry(size, size);
	const material: MeshBasicMaterial = new MeshBasicMaterial({
		transparent: true,
		opacity: 0.5,
		wireframe: true,
		side: FrontSide,
		color: isHovered ? 'blue' : 'gray',
	});

	const handlerPointerOver = (e: ThreeEvent<PointerEvent>) => {
		e.stopPropagation();
		setHovered(true);
	};
	const handlerPointerOut = (e: ThreeEvent<PointerEvent>) => {
		e.stopPropagation();
		setHovered(false);
	};

	return (
		<mesh
			onPointerOver={handlerPointerOver}
			onPointerOut={handlerPointerOut}
			material={material}
			geometry={geometry}
			{...meshProps}
		></mesh>
	);
}
