import { Vector3 } from 'three';

export type TSideClick = 'right' | 'left' | 'top' | 'bottom' | 'front' | 'back' | 'unknown';

export const getSideFromNormal = (normal: Vector3): TSideClick => {
	const tolerance = 0.001;
	const { x, y, z } = normal;

	if (Math.abs(x - 1) < tolerance) return 'right';
	if (Math.abs(x + 1) < tolerance) return 'left';
	if (Math.abs(y - 1) < tolerance) return 'top';
	if (Math.abs(y + 1) < tolerance) return 'bottom';
	if (Math.abs(z - 1) < tolerance) return 'front';
	if (Math.abs(z + 1) < tolerance) return 'back';

	return 'unknown';
};

export const getCubePosition = (normal: Vector3, parentCellPosition: Vector3) => {
	const side = getSideFromNormal(normal);

	const position = new Vector3(
		parentCellPosition.x,
		parentCellPosition.y,
		parentCellPosition.z,
	);

	switch (side) {
		case 'right':
			position.setX(position.x + 1);
			return position;
		case 'left':
			position.setX(position.x - 1);
			return position;
		case 'top':
			position.setY(position.y + 1);
			return position;
		case 'bottom':
			position.setY(position.y - 1);
			return position;
		case 'front':
			position.setZ(position.z + 1);
			return position;
		case 'back':
			position.setZ(position.z - 1);
			return position;
		case 'unknown':
		default:
			throw new Error('Не удалось создать ячейку сцены.');
	}
};
