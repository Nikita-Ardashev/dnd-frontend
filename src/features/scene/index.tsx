'use client';

import { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { CameraControls, GizmoHelper, GizmoViewport } from '@react-three/drei';
import styles from './scene.module.sass';
import { BuildedCubes } from '../buildingCube';
import { GLTFModel } from '../gltfModel';
import { StoreScene, StoreSceneHistory } from '@/stores/storeScene/scene.store';
import { observer } from 'mobx-react-lite';
import { handlerCTRL } from '@/utils/handlerKeys';
import { InteractiveGrid } from '../interactiveGrid/interactiveGrid';
import { Toolbar } from '../toolbar';
import { StoreSceneTools } from '@/stores/storeSceneTools/storeSceneTools.store';

const handlerKey = (e: KeyboardEvent) => {
	handlerCTRL({
		e,
		key: 'z',
		handler: () => {
			StoreSceneHistory.undo();
		},
	});
	handlerCTRL({
		e,
		key: 'z',
		isWithShift: true,
		handler: () => {
			StoreSceneHistory.redo();
		},
	});
};

export const Scene = observer(function Scene() {
	const { isMove } = StoreSceneTools.getCurrent;
	const meshes = StoreScene.meshes;
	const isViewGrid = StoreScene.isViewGrid;
	const isSelectedMesh = StoreScene.isSelectedMesh;

	useEffect(() => {
		window.onkeyup = handlerKey;
	}, []);

	const meshesRender = meshes.map((m) => {
		const scale = m.scale?.getArray;
		return <GLTFModel MSTId={m.id} src={m.fileURL} key={m.id} scale={scale} />;
	});

	return (
		<div className={`${styles.scene} ${isMove ? styles.scene__is_move : ''}`}>
			<div className={styles.scene__tools}>
				<Toolbar />
			</div>
			<Canvas style={{ width: '100%', height: '100%' }}>
				{meshesRender}
				<BuildedCubes isViewGrid={true} />
				{isViewGrid && <InteractiveGrid />}
				<>
					{!isSelectedMesh && (
						<CameraControls
							azimuthAngle={1}
							polarAngle={1}
							distance={20}
							maxDistance={40}
							minDistance={2}
						/>
					)}

					<GizmoHelper alignment="bottom-right" margin={[100, 100]}>
						<GizmoViewport labelColor="white" axisHeadScale={1} disabled />
					</GizmoHelper>
					<ambientLight intensity={0.5} />
					<directionalLight position={[5, 10, 7.5]} intensity={1} castShadow />
				</>
			</Canvas>
		</div>
	);
});
