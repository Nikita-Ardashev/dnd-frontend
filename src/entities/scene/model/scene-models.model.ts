import { withMatrix4 } from '@/shared/lib/mst/with-placement';
import { cast, t } from 'mobx-state-tree';
import { Vector3Tuple } from 'three';

export const SceneModel = withMatrix4(
	t
		.model('SceneModel', {
			id: t.identifier,
			name: t.string,
			type: t.maybeNull(t.string),
			creator: t.optional(t.string, 'root'),
			crated_date: t.optional(t.Date, new Date()),
			fileURL: t.string,
			sizes: t.optional(t.model({ max: t.array(t.number), min: t.array(t.number) }), {
				max: [0, 0, 0],
				min: [0, 0, 0],
			}),
		})
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
