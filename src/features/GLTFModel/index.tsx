'use client';

import { StoreScene } from '@/stores/storeScene/scene.store';
import { StoreSceneTools } from '@/stores/storeSceneTools/storeSceneTools.store';
import { DragControls, Gltf, GltfProps, PivotControls } from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Euler, Matrix4, Quaternion, Vector3 } from 'three';

interface GLTFModel extends GltfProps {
	MSTId: string;
}

export const GLTFModel = observer(function GLTFModel(props: GLTFModel) {
	const { isTransform, isDrag, isRotate, isScale } = StoreSceneTools.getCurrent;
	const { addSelectedMeshId, removeSelectedMeshId } = StoreScene;

	const [isDragged, setIsDragged] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const [isSelected, setIsSelected] = useState(false);

	const selectedEnabled = () => {
		addSelectedMeshId(props.MSTId);
		setIsSelected(true);
	};

	const draggedEnabled = () => {
		setIsSelected(true);
		setIsDragged(true);
	};

	const draggedDisabled = () => {
		setIsDragged(false);
	};

	const handlerDrag = (e: Matrix4) => {
		console.log(e);
		const position = new Vector3();
		const quaternion = new Quaternion();
		const scale = new Vector3();

		// 1. Разлагаем матрицу на компоненты
		// Это стандартный метод Three.js
		e.decompose(position, quaternion, scale);

		// 2. Преобразуем кватернион в привычные углы Эйлера (Euler)
		// const rotation = new Euler().setFromQuaternion(quaternion);
		// console.log({
		// 	quaternion,
		// });
		// StoreScene.getMesh(props.MSTId)?.set({
		// 	position: { x: position.x, y: position.y, z: position.z },
		// 	rotation: { x: rotation.x, y: rotation.y, z: rotation.z },
		// 	scale: { x: scale.x / 100, y: scale.y / 100, z: scale.z / 100 },
		// });
	};

	useEffect(() => {
		const setIsDraggingDisable = () => {
			if (!isDragged && !isHovered && isSelected) {
				removeSelectedMeshId(props.MSTId);
				setIsSelected(false);
			}
		};
		window.document.addEventListener('mouseup', setIsDraggingDisable);
		return () => {
			window.document.removeEventListener('mouseup', setIsDraggingDisable);
		};
	}, [isDragged, isHovered, isSelected, props.MSTId, removeSelectedMeshId]);

	const model = (
		<Gltf
			{...props}
			onPointerDown={(e) => {
				if (
					e.intersections.length > 0 &&
					e.intersections[0].object.uuid !== e.object.uuid
				) {
					return;
				}
				selectedEnabled();
			}}
			onPointerOver={(e) => {
				e.stopPropagation();
				setIsHovered(true);
			}}
			onPointerLeave={(e) => {
				e.stopPropagation();
				setIsHovered(false);
			}}
			useDraco="/draco-gltf"
		/>
	);

	if (isTransform || isRotate || isScale || isDrag) {
		return (
			<DragControls
				// onDrag={handlerDrag}
				onDragStart={draggedEnabled}
				onDragEnd={draggedDisabled}
				dragConfig={{ threshold: 5, enabled: isHovered }}
			>
				<PivotControls
					onDragStart={draggedEnabled}
					onDragEnd={draggedDisabled}
					enabled={isSelected}
					disableAxes={!isTransform && !isDrag}
					disableRotations={!isTransform && !isRotate}
					disableScaling={!isTransform && !isScale}
					disableSliders={true}
				>
					{model}
				</PivotControls>
			</DragControls>
		);
	}

	return model;
});
