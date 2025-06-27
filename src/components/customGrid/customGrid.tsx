import { ThreeElements, Vector3 } from '@react-three/fiber';
import React from 'react';
import { Euler } from 'three';
import CustomGridCell from './customGridCell';

type TGroupProps = ThreeElements['group'];
type TSide = 'center' | 'left' | 'right';
interface ICustomProps extends TGroupProps {
	side?: TSide;
	isViewGrid?: boolean;
}

const COUNT = 10;
const cell = COUNT * 10;

const generateGridLines = () => {
	const lines: Vector3[] = [];
	for (let i = 0; i < cell; i++) {
		const step = -Math.floor(i / COUNT);
		lines.push([(i % COUNT) + 0.5, step - 0.5, 0]);
	}
	return lines;
};
const { position, rotation }: { rotation: Euler; position: Vector3 } = {
	position: [1, 0.5, 1],
	rotation: new Euler(-Math.PI / 2, 0, 0),
};

export default function CustomGrid({
	side = 'center',
	isViewGrid = true,
	...groupProps
}: ICustomProps) {
	const lines = generateGridLines().map((pos, i) => (
		<CustomGridCell key={side + i} position={pos} />
	));

	return (
		<group position={position} rotation={rotation} {...groupProps}>
			{groupProps.children}
			{isViewGrid && lines}
		</group>
	);
}
