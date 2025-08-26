'use client';

import React from 'react';
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
interface IScene {
	children?: React.ReactNode;
	isControl?: boolean;
}

export function Scene({ children, isControl = true }: IScene) {
	return (
		<div className={styles.scene}>
			<Canvas style={{ width: '100%', height: '100%', background: 'grey' }}>
				<GLTFModel
					src={'/api/models/barrel/gltf/medieval_barrel.gltf'}
					scale={new Vector3(0.1, 0.1, 0.1)}
					position={new Vector3(0, 0, 0)}
				/>
				<PivotControls autoTransform={false}>
					{children}
					<CustomGrid
						isViewGrid={true}
						mesh={{
							position: new Vector3(5, -5, 0),
							geometry: new BoxGeometry(10, 10, 1),
							material: new MeshBasicMaterial({ color: 'blue' }),
						}}
					/>
					{isControl && (
						<CameraControls
							azimuthAngle={1}
							polarAngle={1}
							distance={20}
							maxDistance={40}
							minDistance={2}
						/>
					)}
				</PivotControls>
				<GizmoHelper alignment="bottom-right" margin={[100, 100]}>
					<GizmoViewport labelColor="white" axisHeadScale={1} disabled />
				</GizmoHelper>
				<ambientLight intensity={0.5} />
				<directionalLight
					position={[5, 10, 7.5]}
					intensity={1}
					castShadow // если нужны тени
				/>
			</Canvas>
		</div>
	);
}
