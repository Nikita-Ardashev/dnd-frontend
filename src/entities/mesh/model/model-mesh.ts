import { cast, SnapshotOut, t } from 'mobx-state-tree';
import { MMesh } from './mesh';
import { Vector3Tuple } from 'three';
import { MUrlOrCache, withMatrix4 } from '@/shared/lib/mst';

export const MModelMesh = t.compose(
	'ModelMesh',
	MMesh,
	t.model({
		type: t.maybeNull(t.string),
		creator: t.optional(t.string, 'root'),
		createdDate: t.optional(t.Date, new Date()),
		name: t.string,
	}),
);

export const MModelInternalMesh = withMatrix4(
	t
		.compose(
			'ModelInternalMesh',
			MModelMesh,
			t.model({
				file: MUrlOrCache,
				sizes: t.optional(
					t.model({ max: t.array(t.number), min: t.array(t.number) }),
					{
						max: [0, 0, 0],
						min: [0, 0, 0],
					},
				),
			}),
		)
		.views((self) => ({
			get getSizeMin() {
				return Array.from(self.sizes.min) as [number, number, number];
			},
			get getSizeMax() {
				return Array.from(self.sizes.max) as [number, number, number];
			},
		}))
		.actions((self) => ({
			setSizes(sizes: { max: Vector3Tuple; min: Vector3Tuple }) {
				self.sizes.max = cast(sizes.max);
				self.sizes.min = cast(sizes.min);
			},
		})),
);

export const MModelExternalMesh = t.compose(
	'ModelExternalMesh',
	MModelMesh,
	t.model({
		preview: t.string,
	}),
);

type TModelMesh = SnapshotOut<typeof MModelMesh>;
type TModelInternalMesh = SnapshotOut<typeof MModelInternalMesh>;
type TModelExternalMesh = SnapshotOut<typeof MModelExternalMesh>;

export type { TModelMesh, TModelInternalMesh, TModelExternalMesh };
