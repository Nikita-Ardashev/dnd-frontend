import { Vector3, Quaternion, Matrix4 } from 'three';

const positionIndex = { x: 12, y: 13, z: 14 };
const scaleIndex = { x: 0, y: 5, z: 10 };

type TNameReturnValue = 'position' | 'scale' | 'rotation';
interface IReturnValue extends Record<TNameReturnValue, Vector3 | Quaternion> {
	position: Vector3;
	scale: Vector3;
	rotation: Quaternion;
}

export const getPlacementFromMatrix4 = <T extends TNameReturnValue>(
	matrix: Matrix4,
	returnValue: T,
): IReturnValue[T] => {
	const arr = matrix.toArray();
	let result = undefined;

	if (returnValue === 'position') {
		const position = new Vector3(
			arr[positionIndex.x],
			arr[positionIndex.y],
			arr[positionIndex.z],
		);
		result = position;
	}
	if (returnValue === 'scale') {
		const scale = new Vector3(arr[scaleIndex.x], arr[scaleIndex.y], arr[scaleIndex.z]);
		result = scale;
	}
	if (returnValue === 'rotation') {
		const sx = new Vector3(arr[0], arr[1], arr[2]).length();
		const sy = new Vector3(arr[4], arr[5], arr[6]).length();
		const sz = new Vector3(arr[8], arr[9], arr[10]).length();

		const rotation = new Quaternion(sx, sy, sz);
		result = rotation;
	}

	return result as IReturnValue[T];
};
