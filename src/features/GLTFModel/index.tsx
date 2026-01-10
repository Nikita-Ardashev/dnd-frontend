'use client';

import { StoreScene } from '@/stores/storeScene/scene.store';
import { StoreSceneTools } from '@/stores/storeSceneTools/storeSceneTools.store';
import { DragControls, Gltf, GltfProps, PivotControls } from '@react-three/drei';
import { ThreeElements } from '@react-three/fiber';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Matrix4, Quaternion, Vector3 } from 'three';

interface IProps {
	MSTId: string;
	gltf: GltfProps;
	group?: ThreeElements['group'];
}

export const GLTFModel = observer(function GLTFModel(props: IProps) {
	const { isDrag, isRotate, isScale } = StoreSceneTools.getCurrent;
	const { addSelectedMeshId, removeSelectedMeshId } = StoreScene;

	const [isDragged, setIsDragged] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const [isSelected, setIsSelected] = useState(false);

	const isActiveTool = isRotate || isScale || isDrag;

	const selectedEnabled = () => {
		if (!isActiveTool) return;
		addSelectedMeshId(props.MSTId);
		setIsSelected(true);
	};

	const draggedEnabled = () => {
		if (!isActiveTool) return;
		setIsSelected(true);
		setIsDragged(true);
	};

	const draggedDisabled = () => {
		setIsDragged(false);
	};

	const handlerDrag = (e: Matrix4) => {
		const position = new Vector3();
		const quaternion = new Quaternion();
		const scale = new Vector3();

		e.decompose(position, quaternion, scale);

		StoreScene.getMesh(props.MSTId)?.set({
			position: { x: position.x / 100, y: position.y / 100, z: position.z / 100 },
		});
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
			{...props.gltf}
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

	return (
		<group
			{...props.group}
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
		>
			<DragControls
				onDrag={handlerDrag}
				onDragStart={draggedEnabled}
				onDragEnd={draggedDisabled}
				dragConfig={{ threshold: 5, enabled: isHovered && isActiveTool }}
			>
				<PivotControls
					onDragStart={draggedEnabled}
					onDragEnd={draggedDisabled}
					onDrag={handlerDrag}
					enabled={isSelected && isActiveTool}
					disableAxes={!isDrag}
					disableRotations={!isRotate}
					disableScaling={!isScale}
					disableSliders={true}
				>
					{model}
				</PivotControls>
			</DragControls>
		</group>
	);
});
