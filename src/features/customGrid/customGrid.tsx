import { ThreeElements, Vector3 } from '@react-three/fiber';
import React from 'react';
import { BoxGeometry, Euler } from 'three';
import { CustomGridCell } from '.';
type TGroupProps = Omit<ThreeElements['group'], 'children'>;
type TMeshProps = ThreeElements['mesh'];
interface ICustomProps extends TGroupProps {
	isViewGrid?: boolean;
	mesh?: TMeshProps & { geometry: BoxGeometry };
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

const lines = generateGridLines().map((pos, i) => (
	<CustomGridCell key={i} position={pos} />
));

export function CustomGrid({ isViewGrid = true, ...groupProps }: ICustomProps) {
	return (
		<group position={position} rotation={rotation} {...groupProps}>
			<mesh {...groupProps.mesh} />
			{isViewGrid && lines}
		</group>
	);
}
