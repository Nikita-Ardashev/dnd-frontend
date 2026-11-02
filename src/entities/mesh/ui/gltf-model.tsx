'use client';

import { observer } from 'mobx-react-lite';
import { useGLTF } from '@react-three/drei';
import { Box3 } from 'three';
import { Instance } from 'mobx-state-tree';
import { useLayoutEffect } from 'react';
import { MModelInternalMesh } from '../model/model-mesh';

interface IProps {
	model: Instance<typeof MModelInternalMesh>;
}

/** Загружает GLTF модели и сохраняет её габариты в сторе. Без интерактива. */
export const GLTFModel = observer(function GLTFModel({ model }: IProps) {
	const { scene } = useGLTF(model.file.getSource);

	useLayoutEffect(() => {
		const positionPivot = new Box3().setFromObject(scene);
		model.setSizes({
			max: positionPivot.max.toArray(),
			min: positionPivot.min.toArray(),
		});
	}, [model, scene]);

	return <primitive object={scene} />;
});
