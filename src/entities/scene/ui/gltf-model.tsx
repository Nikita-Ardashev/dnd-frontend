'use client';

import { useStoreScene } from '@/shared/lib/mst/hooks';
import { observer } from 'mobx-react-lite';
import { Controls } from './controls';
import { useGLTF } from '@react-three/drei';
import { Box3 } from 'three';
import { useLayoutEffect } from 'react';

interface IProps {
	MSTId: string;
}

export const GLTFModel = observer(function GLTFModel({ MSTId }: IProps) {
	const { construct, isEditable } = useStoreScene();

	const model = construct.getModel(MSTId);

	if (model === undefined) {
		throw new Error(`Не удалось получить модель по id: ${MSTId}`);
	}

	const { scene } = useGLTF(model.fileURL);

	useLayoutEffect(() => {
		const positionPivot = new Box3().setFromObject(scene);
		model.setSizes({
			max: positionPivot.max.toArray(),
			min: positionPivot.min.toArray(),
		});
	}, [model, scene]);

	const gltf = <primitive object={scene} />;

	return isEditable ? <Controls id={MSTId}>{gltf}</Controls> : gltf;
});
