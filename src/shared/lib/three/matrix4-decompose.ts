import { Matrix4, Quaternion, Vector3 } from 'three';

export const matrix4Decompose = (matrix: Matrix4, isClone: boolean = true) => {
	const clonedMatrix = isClone ? matrix.clone() : matrix;

	const position = new Vector3();
	const rotation = new Quaternion();
	const scale = new Vector3();

	clonedMatrix.decompose(position, rotation, scale);

	return { position, rotation, scale };
};
