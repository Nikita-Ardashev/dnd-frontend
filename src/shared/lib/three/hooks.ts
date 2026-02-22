import { useGLTF } from '@react-three/drei';
import { Matrix4, Mesh } from 'three';

export const useGltfScaleFromMatrix4 = (
	fileURL: string,
	scale: number | [number, number, number],
) => {
	const { scene } = useGLTF(fileURL);

	const clonedScene = scene.clone(true);
	const scaleMatrix = new Matrix4();

	if (Array.isArray(scale)) {
		scaleMatrix.makeScale(...scale);
	} else {
		scaleMatrix.makeScale(scale, scale, scale);
	}

	clonedScene.applyMatrix4(scaleMatrix);
	clonedScene.traverse((child) => {
		if (child instanceof Mesh) {
			child.geometry = child.geometry.clone();
			child.geometry.computeBoundingSphere();
			child.geometry.computeBoundingBox();
		}
	});

	return clonedScene;
};
