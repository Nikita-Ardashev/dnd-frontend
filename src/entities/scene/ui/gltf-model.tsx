'use client';

import { useStoreScene } from '@/shared/lib/mst/hooks';
import { DragControls, Gltf, PivotControls } from '@react-three/drei';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Matrix4, Quaternion, Vector3 } from 'three';

interface IProps {
	MSTId: string;
}

export const GLTFModel = observer(function GLTFModel({ MSTId }: IProps) {
	const scene = useStoreScene();
	const { isDrag, isRotate, isScale } = scene.tools.getCurrent;
	const { addSelectedMeshId, removeSelectedMeshId } = scene;

	const [isDragged, setIsDragged] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const [isSelected, setIsSelected] = useState(false);

	const gltf = scene.construct.getMesh(MSTId)!;

	const scaleGroup = gltf.scale?.getArray;
	const positionGroup = gltf.position?.getArray;
	const rotationGroup = gltf.rotation?.getArray;

	const [dragPosition, setDragPosition] = useState(
		gltf.position?.getVector3 ?? { x: 0, y: 0, z: 0 },
	);

	const isActiveTool = isRotate || isScale || isDrag;

	const selectedEnabled = () => {
		if (!isActiveTool) return;
		addSelectedMeshId(MSTId);
		setIsSelected(true);
	};

	const draggedEnabled = () => {
		if (!isActiveTool) return;
		setIsSelected(true);
		setIsDragged(true);
	};

	const draggedDisabled = () => {
		setIsDragged(false);

		gltf.set({
			position: { x: dragPosition.x, y: dragPosition.y, z: dragPosition.z },
		});
	};

	const handlerDrag = (e: Matrix4) => {
		const position = new Vector3();
		const quaternion = new Quaternion();
		const scale = new Vector3();

		e.decompose(position, quaternion, scale);

		setDragPosition(new Vector3(position.x / 100, position.y / 100, position.z / 100));
	};

	useEffect(() => {
		const setIsDraggingDisable = () => {
			if (!isDragged && !isHovered && isSelected) {
				removeSelectedMeshId(MSTId);
				setIsSelected(false);
			}
		};
		window.document.addEventListener('mouseup', setIsDraggingDisable);
		return () => {
			window.document.removeEventListener('mouseup', setIsDraggingDisable);
		};
	}, [isDragged, isHovered, isSelected, MSTId, removeSelectedMeshId]);

	const model = (
		<Gltf
			src={gltf.fileURL}
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
			scale={scaleGroup}
			position={positionGroup}
			rotation={rotationGroup}
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
