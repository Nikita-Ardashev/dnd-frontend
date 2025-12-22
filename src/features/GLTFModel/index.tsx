'use client';

import { StoreScene } from '@/stores/storeScene/scene.store';
import { StoreSceneTools } from '@/stores/storeSceneTools/storeSceneTools.store';
import { DragControls, Gltf, GltfProps, PivotControls } from '@react-three/drei';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Euler, Matrix4, Quaternion, Vector3 } from 'three';

interface GLTFModel extends GltfProps {
	MSTId: string;
}

export const GLTFModel = observer(function GLTFModel(props: GLTFModel) {
	const { isTransform, isDrag, isRotate, isScale } = StoreSceneTools.getCurrent;

	const [isDragging, setIsDragging] = useState(false);
	const handlerDrag = (e: Matrix4) => {
		console.log(e);
		const position = new Vector3();
		const quaternion = new Quaternion();
		const scale = new Vector3();

		// 1. Разлагаем матрицу на компоненты
		// Это стандартный метод Three.js
		e.decompose(position, quaternion, scale);

		// 2. Преобразуем кватернион в привычные углы Эйлера (Euler)
		const rotation = new Euler().setFromQuaternion(quaternion);
		console.log({
			quaternion,
		});
		// StoreScene.getMesh(props.MSTId)?.set({
		// 	position: { x: position.x, y: position.y, z: position.z },
		// 	rotation: { x: rotation.x, y: rotation.y, z: rotation.z },
		// 	scale: { x: scale.x / 100, y: scale.y / 100, z: scale.z / 100 },
		// });
	};

	useEffect(() => {
		const setIsDraggingDisable = () => {
			if (isDragging) setIsDragging(false);
		};
		window.document.addEventListener('click', setIsDraggingDisable);
		return () => {
			window.document.removeEventListener('click', setIsDraggingDisable);
		};
	}, [isDragging]);

	const model = (
		<Gltf
			{...props}
			onClick={() => {
				setIsDragging(true);
			}}
			useDraco="/draco-gltf"
		/>
	);

	if (isTransform || isRotate || isScale || isDrag) {
		return (
			<mesh
				onPointerDown={() => {
					StoreScene.setIsSelectedMesh(true);
				}}
				onPointerUp={() => {
					StoreScene.setIsSelectedMesh(false);
				}}
			>
				<DragControls
					onDrag={handlerDrag}
					onDragEnd={() => {
						setIsDragging(false);
					}}
				>
					<PivotControls
						onDragStart={() => {
							StoreScene.setIsSelectedMesh(true);
						}}
						onDragEnd={() => {
							StoreScene.setIsSelectedMesh(false);
						}}
						anchor={[-1.5, -1.5, -1.5]}
						enabled={isDragging}
						disableAxes={!isTransform && !isDrag}
						disableRotations={!isTransform && !isRotate}
						disableScaling={!isTransform && !isScale}
						disableSliders={true}
					>
						{model}
					</PivotControls>
				</DragControls>
			</mesh>
		);
	}

	return model;
});
