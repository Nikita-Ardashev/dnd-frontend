import { IAnyModelType, SnapshotIn, t } from 'mobx-state-tree';
import { Matrix4, Matrix4Tuple, Quaternion, Vector3 } from 'three';

export type TSnapshotMatrix4 = SnapshotIn<typeof MSTMatrix4>;
export interface ISnapshotPlacementForMatrix {
	position?: number[];
	rotation?: number[];
	scale?: number[];
}

/**
 *	[n11]  - X-компонента X-оси (scale по X * rotation)

 *	[n12]  - Y-компонента X-оси (rotation)

 *	[n13]  - Z-компонента X-оси (rotation)

 *	[n14]  - всегда 0 для аффинных трансформаций

 *	[n21]  - X-компонента Y-оси (rotation)

 *	[n22]  - Y-компонента Y-оси (scale по Y * rotation)

 *	[n23]  - Z-компонента Y-оси (rotation)

 *	[n24]  - всегда 0 для аффинных трансформаций

 *	[n31]  - X-компонента Z-оси (rotation)

 *	[n32]  - Y-компонента Z-оси (rotation)

 *	[n33] - Z-компонента Z-оси (scale по Z * rotation)

 *	[n34] - всегда 0 для аффинных трансформаций

 *	[n41] - Позиция по X (position.x)

 *	[n42] - Позиция по Y (position.y)

 *	[n43] - Позиция по Z (position.z)

 *	[n44] - всегда 1 для аффинных трансформаций

 */
export const MSTMatrix4 = t.optional(
	t.frozen<Matrix4Tuple>(),
	[1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
);

const Matrix = t
	.model('Matrix', {
		matrix4: MSTMatrix4,
	})
	.views((self) => ({
		get getMatrix4() {
			return new Matrix4().fromArray(self.matrix4);
		},
		get getMatrixArray() {
			return Array.from(self.matrix4) as Matrix4Tuple;
		},
		get getPlacement() {
			const matrix = new Matrix4().fromArray(self.matrix4);
			const position = new Vector3();
			const rotation = new Quaternion();
			const scale = new Vector3(1, 1, 1);

			matrix.decompose(position, rotation, scale);

			return { scale, position, rotation };
		},
	}))
	.actions((self) => ({
		setMatrix4(matrix4: Matrix4) {
			self.matrix4 = matrix4.toArray();
		},
		setMatrix4FromPlacement(placement: ISnapshotPlacementForMatrix) {
			const matrix = new Matrix4().fromArray(self.matrix4);

			if (placement.position) {
				matrix.setPosition(new Vector3(...placement.position));
			}

			if (placement.rotation) {
				matrix.makeRotationFromQuaternion(new Quaternion(...placement.rotation));
			}

			if (placement.scale) {
				matrix.scale(new Vector3(...placement.scale));
			}

			self.matrix4 = matrix.toArray();
		},
	}));

export const withMatrix4 = <T extends IAnyModelType>(model: T) => {
	const newModel = t.compose(model, Matrix) as T & typeof Matrix;
	return newModel;
};
