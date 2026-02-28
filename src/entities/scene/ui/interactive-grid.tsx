'use client';

import { Grid } from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { MeshBasicMaterial, PlaneGeometry } from 'three';
import { useStoreScene } from '@/shared/lib/mst/hooks';
import { BuildingCubeTransparent } from './builded-cube-transparent';

type TPosition = [x: number, y: number, z: number];

const positionFloor = (pos: TPosition): TPosition => {
	return [Math.round(pos[0]), 0, Math.round(pos[2])];
};

export const InteractiveGrid = observer(function InteractiveGrid() {
	const scene = useStoreScene();
	const [cellPosition, setCellPosition] = useState<TPosition | null>(null);

	if (!scene.isViewGrid) return null;

	const { isNewBuild } = scene.tools.getCurrent;

	const { width, height } = scene.size;

	const pointerMove = (e: ThreeEvent<PointerEvent>) => {
		if (!isNewBuild) return;
		e.stopPropagation();
		const cords = positionFloor(e.point.toArray());
		setCellPosition(cords);
	};
	const pointerLeave = (e: ThreeEvent<PointerEvent>) => {
		if (!isNewBuild) return;
		e.stopPropagation();
		const cords = positionFloor(e.point.toArray());
		if (cellPosition === null) return;

		if (cellPosition[0] !== cords[0] || cellPosition[2] !== cords[2])
			setCellPosition(null);
	};

	return (
		<>
			<BuildingCubeTransparent
				cellPosition={cellPosition}
				meshProps={{
					onPointerLeave: () => {
						setCellPosition(null);
					},
				}}
			/>
			<group position={[-0.5, -0.5, -0.5]}>
				<mesh
					onPointerMove={pointerMove}
					onPointerLeave={pointerLeave}
					geometry={new PlaneGeometry(width, height)}
					material={new MeshBasicMaterial({ transparent: true, opacity: 0 })}
					position={[0, -0.01, 0]}
					rotation={[-Math.PI / 2, 0, 0]}
				/>
				<Grid
					cellColor={'gray'}
					cellThickness={0}
					sectionColor={'gray'}
					args={[width, height]}
					side={2}
				/>
			</group>
		</>
	);
});
