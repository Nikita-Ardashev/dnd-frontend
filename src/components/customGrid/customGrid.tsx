'use client';
import { ThreeElements, Vector3 } from '@react-three/fiber';
import React from 'react';
import { DoubleSide, Euler } from 'three';

type TMeshProps = ThreeElements['mesh'];

interface ICustomProps extends TMeshProps {
	isVertical?: boolean;
	side?: 'center' | 'left' | 'right';
}

export default function CustomGrid({
	isVertical = false,
	side = 'center',
	...meshProps
}: ICustomProps) {
	const rotation: Euler = new Euler(isVertical ? Math.PI / 2 : -Math.PI / 2, 0, 0);
	const position: Vector3 = [0, 0, 0];
	if (Object.values(meshProps).length === 0 || meshProps === undefined) {
	}

	return (
		<mesh {...meshProps} rotation={rotation} position={position}>
			<planeGeometry args={[10, 10, 10, 10]} />
			<meshBasicMaterial
				color="gray"
				transparent
				opacity={0.5}
				wireframe
				side={DoubleSide}
			/>
		</mesh>
	);
}
