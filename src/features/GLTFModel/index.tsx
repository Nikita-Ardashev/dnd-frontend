'use client';

import { StoreScene } from '@/stores/storeScene/scene.store';
import { StoreSceneTools } from '@/stores/storeSceneTools/storeSceneTools.store';
import { DragControls, Gltf, GltfProps, PivotControls } from '@react-three/drei';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Matrix4 } from 'three';

interface GLTFModel extends GltfProps {
	MSTId: string;
}

export const GLTFModel = observer(function GLTFModel(props: GLTFModel) {
	const { isTransform, isDrag } = StoreSceneTools.getCurrent;

	const [dragging, setDragging] = useState(false);

	const handlerDrag = (e: Matrix4) => {
		console.log(e);
		// StoreScene.getMesh(props.MSTId)?.set({ position: { x: 0, y: 0, z: 0 } });
	};

	const model = (
		<Gltf
			{...props}
			onClick={() => {
				setDragging(true);
			}}
			useDraco="/draco-gltf"
		/>
	);

	if (isTransform) {
		return (
			<PivotControls
				onDragStart={() => {
					StoreScene.setIsSelectedMesh(true);
				}}
				onDragEnd={() => {
					StoreScene.setIsSelectedMesh(false);
				}}
				anchor={[-1.5, -1.5, -1.5]}
				enabled={dragging}
			>
				{model}
			</PivotControls>
		);
	}

	if (isDrag) {
		return (
			<mesh
				onPointerDown={() => {
					StoreScene.setIsSelectedMesh(true);
				}}
				onPointerUp={() => {
					StoreScene.setIsSelectedMesh(false);
				}}
			>
				<DragControls onDrag={handlerDrag}>{model}</DragControls>
			</mesh>
		);
	}

	return model;
});
