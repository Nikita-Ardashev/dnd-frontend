'use client';

import { Grid } from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { MeshBasicMaterial, PlaneGeometry } from 'three';
import { BuildingCube } from '../buildingCube';
import { StoreScene } from '@/stores/storeScene/scene.store';
import { StoreSceneTools } from '@/stores/storeSceneTools/storeSceneTools.store';

interface IPosition {
	x: number;
	y: number;
	z: number;
}

const positionFloor = (pos: IPosition) => {
	const cords: IPosition = { x: 0, y: 0, z: 0 };
	cords['x'] = Math.round(pos.x);
	cords['y'] = 0;
	cords['z'] = Math.round(pos.z);
	return cords;
};

export const InteractiveGrid = observer(function InteractiveGrid() {
	const { isBuild } = StoreSceneTools.getCurrent;

	const { width, height } = StoreScene.size;
	const [cellPosition, setCellPosition] = useState<IPosition | null>(null);
	const pointerMove = (e: ThreeEvent<PointerEvent>) => {
		{
			const cords = positionFloor(e.point);
			setCellPosition(cords);
		}
	};
	const pointerLeave = (e: ThreeEvent<PointerEvent>) => {
		const cords = positionFloor(e.point);
		if (cellPosition === null) return;
		if (cellPosition.x !== cords.x || cellPosition.z !== cords.z) setCellPosition(null);
	};

	return (
		<>
			{isBuild && cellPosition !== null && (
				<BuildingCube
					cubeId={'ghost-cube-for-view'}
					position={[cellPosition.x, cellPosition.y, cellPosition.z]}
					isTransparent
					onPointerLeave={() => {
						setCellPosition(null);
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
					sectionColor={'gray'}
					args={[width, height]}
					side={2}
				/>
			</group>
		</>
	);
});
