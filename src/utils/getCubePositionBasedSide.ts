import { Vector3 } from 'three';

export type TSideClick = 'right' | 'left' | 'top' | 'bottom' | 'front' | 'back' | 'unknown';

export interface IReturnCubePosition {
	side: TSideClick;
	position: Vector3;
}

export const getSideFromNormal = (normal: Vector3): TSideClick => {
	const absX = Math.abs(normal.x);
	const absY = Math.abs(normal.y);
	const absZ = Math.abs(normal.z);
	const max = Math.max(absX, absY, absZ);

	if (max < 0.5) return 'unknown';

	if (max === absX) return normal.x > 0 ? 'right' : 'left';
	if (max === absY) return normal.y > 0 ? 'top' : 'bottom';
	if (max === absZ) return normal.z > 0 ? 'front' : 'back';

	return 'unknown';
};

export const getCubePosition = (
	normal: Vector3,
	parentCellPosition: Vector3,
): IReturnCubePosition => {
	const side = getSideFromNormal(normal);

	if (side === 'unknown') {
		throw new Error('Не удалось определить сторону грани для создания ячейки.');
	}

	const position = parentCellPosition
		.clone()
		.add(new Vector3(Math.round(normal.x), Math.round(normal.y), Math.round(normal.z)));

	return { position, side };
};
