'use client';

import { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { GizmoHelper, GizmoViewport } from '@react-three/drei';
import styles from './scene.module.sass';
import { BuildedCubes } from '../buildingCube';
import { GLTFModel } from '../gltfModel';
import { StoreScene, StoreSceneHistory } from '@/stores/storeScene/scene.store';
import { observer } from 'mobx-react-lite';
import { handlerCTRL } from '@/utils/handlerKeys';
import { InteractiveGrid } from '../interactiveGrid/interactiveGrid';
import { Toolbar } from '../toolbar';
import { StoreSceneTools } from '@/stores/storeSceneTools/storeSceneTools.store';
import { Camera } from './camera';

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
	useEffect(() => {
		window.onkeyup = handlerKey;
	}, []);

	const { isMove } = StoreSceneTools.getCurrent;
	const meshes = StoreScene.meshes;
	const isViewGrid = StoreScene.isViewGrid;
	const isSelectedMesh = StoreScene.selectedMeshIds.length > 0;

	const meshesRender = meshes.map((m) => {
		const scale = m.scale?.getArray;
		const position = m.position?.getArray;
		const rotation = m.rotation?.getArray;
		return (
			<GLTFModel
				key={m.id}
				MSTId={m.id}
				gltf={{
					src: m.fileURL,
				}}
				group={{ position, scale, rotation }}
			/>
		);
	});

	return (
		<div className={`${styles.scene} ${isMove ? styles.scene__is_move : ''}`}>
			<div className={styles.scene__tools}>
				<Toolbar />
			</div>
			<Canvas style={{ width: '100%', height: '100%' }}>
				{meshesRender}
				<BuildedCubes />
				{isViewGrid && <InteractiveGrid />}
				<>
					<Camera enabled={!isSelectedMesh} />
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
