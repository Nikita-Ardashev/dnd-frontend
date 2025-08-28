'use client';

import React, { memo, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import {
	CameraControls,
	GizmoHelper,
	GizmoViewport,
	PivotControls,
} from '@react-three/drei';
import styles from './scene.module.sass';
import { BoxGeometry, MeshBasicMaterial, Vector3 } from 'three';
import { CustomGrid } from '../customGrid';
import { GLTFModel } from '../GLTFModel';
import { StoreScene } from '@/stores/scene/scene.store';
import { observer } from 'mobx-react-lite';
interface IScene {
	children?: React.ReactNode;
}

export const Scene = memo(
	observer(function Scene({ children }: IScene) {
		const control = StoreScene.isControl;
		const meshes = StoreScene.getCurrentChanges;
		console.log(meshes);
		const meshesRender = useMemo(
			() =>
				meshes.map((m) => {
					const scale = m.scale?.getArray;

					return <GLTFModel src={m.fileURL} key={m.id} scale={scale} />;
				}),
			[meshes],
		);

		return (
			<div className={styles.scene}>
				<Canvas style={{ width: '100%', height: '100%', background: 'grey' }}>
					<PivotControls autoTransform={false}>
						{meshesRender}
						{children}
						<CustomGrid
							isViewGrid={true}
							mesh={{
								position: new Vector3(5, -5, 0),
								geometry: new BoxGeometry(10, 10, 1),
								material: new MeshBasicMaterial({ color: 'blue' }),
							}}
						/>

						<CameraControls
							azimuthAngle={1}
							polarAngle={1}
							distance={20}
							maxDistance={40}
							minDistance={2}
							enabled={control}
						/>
					</PivotControls>
					<GizmoHelper alignment="bottom-right" margin={[100, 100]}>
						<GizmoViewport labelColor="white" axisHeadScale={1} disabled />
					</GizmoHelper>
					<ambientLight intensity={0.5} />
					<directionalLight position={[5, 10, 7.5]} intensity={1} castShadow />
				</Canvas>
			</div>
		);
	}),
);
