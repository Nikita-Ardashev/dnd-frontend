'use client';

import { StoreScene } from '@/stores/scene/scene.store';
import { DragControls, Gltf, GltfProps, PivotControls } from '@react-three/drei';
import { useCallback, useState } from 'react';

export function GLTFModel(props: GltfProps) {
	const setIsControl = StoreScene.setIsControl;

	const [dragging, setDragging] = useState(false);

	const setDisabledControl = useCallback(() => {
		setIsControl(false);
	}, [setIsControl]);
	const setEnabledControl = useCallback(() => {
		setIsControl(true);
	}, [setIsControl]);

	return (
		<DragControls onDragStart={setDisabledControl} onDragEnd={setEnabledControl}>
			<PivotControls
				onDragStart={setDisabledControl}
				onDragEnd={setEnabledControl}
				autoTransform
				anchor={[-1.5, -1.5, -1.5]}
				enabled={dragging}
			>
				<Gltf
					{...props}
					onClick={() => {
						setDragging(true);
					}}
					useDraco="/draco-gltf"
				/>
			</PivotControls>
		</DragControls>
	);
}
