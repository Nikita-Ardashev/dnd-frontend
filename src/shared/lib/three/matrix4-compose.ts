import { Matrix4, Quaternion, Vector3 } from 'three';

interface IPlacementMatrix4Compose {
	position: Vector3 | number[];
	rotation: Quaternion | number[];
	scale: Vector3 | number[];
}

export const matrix4Compose = (
	placement: IPlacementMatrix4Compose,
	matrix: Matrix4 = new Matrix4(),
	isClone: boolean = true,
) => {
	const clonedMatrix = isClone ? matrix.clone() : matrix;

	const position = Array.isArray(placement.position)
		? new Vector3(...placement.position)
		: placement.position;
	const rotation = Array.isArray(placement.rotation)
		? new Quaternion(...placement.rotation)
		: placement.rotation;
	const scale = Array.isArray(placement.scale)
		? new Vector3(...placement.scale)
		: placement.scale;

	clonedMatrix.compose(position, rotation, scale);

	return clonedMatrix;
};
