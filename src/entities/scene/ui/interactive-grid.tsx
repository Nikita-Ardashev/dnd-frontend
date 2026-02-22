'use client';

import { Grid } from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { MeshBasicMaterial, PlaneGeometry, Vector3 } from 'three';
import { useStoreScene } from '@/shared/lib/mst/hooks';
import { BuildingCubeTransparent } from './builded-cube-transparent';

interface IPosition {
	x: number;
	y: number;
	z: number;
}

const positionFloor = (pos: IPosition) => {
	const cords = new Vector3();
	cords.setX(Math.round(pos.x));
	cords.setY(0);
	cords.setZ(Math.round(pos.z));
	return cords;
};

export const InteractiveGrid = observer(function InteractiveGrid() {
	const scene = useStoreScene();
	const [cellPosition, setCellPosition] = useState<IPosition | null>(null);

	if (!scene.isViewGrid) return null;

	const { isNewBuild } = scene.tools.getCurrent;

	const { width, height } = scene.size;

	const pointerMove = (e: ThreeEvent<PointerEvent>) => {
		if (!isNewBuild) return;
		e.stopPropagation();
		const cords = positionFloor(e.point);
		setCellPosition(cords);
	};
	const pointerLeave = (e: ThreeEvent<PointerEvent>) => {
		if (!isNewBuild) return;
		e.stopPropagation();
		const cords = positionFloor(e.point);
		if (cellPosition === null) return;

		if (cellPosition.x !== cords.x || cellPosition.z !== cords.z) setCellPosition(null);
	};

	return (
		<>
			{isNewBuild && cellPosition !== null && (
				<BuildingCubeTransparent
					cellPosition={
						new Vector3(cellPosition.x, cellPosition.y, cellPosition.z)
					}
					meshProps={{
						onPointerLeave: () => {
							setCellPosition(null);
						},
					}}
				/>
			)}
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
