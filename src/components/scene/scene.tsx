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
import CustomGrid from '../customGrid/customGrid';
interface IScene {
	children?: React.ReactNode;
	isControl?: boolean;
}

export function Scene({ children, isControl = true }: IScene) {
	return (
		<div className={styles.scene}>
			<Canvas style={{ width: '100%', height: '100%', background: 'black' }}>
				<PivotControls autoTransform={false}>
					{children}
					<CustomGrid isViewGrid={true}>
						<mesh position={[5, -5, 0]}>
							<boxGeometry args={[10, 10, 1]} />
							<meshBasicMaterial color={'blue'} />
						</mesh>
					</CustomGrid>
					{isControl && (
						<CameraControls
							azimuthAngle={1}
							polarAngle={1}
							distance={20}
							maxDistance={20}
							minDistance={2}
						/>
					)}
				</PivotControls>
				<GizmoHelper alignment="bottom-right" margin={[100, 100]}>
					<GizmoViewport labelColor="white" axisHeadScale={1} disabled />
				</GizmoHelper>
			</Canvas>
		</div>
	);
}
