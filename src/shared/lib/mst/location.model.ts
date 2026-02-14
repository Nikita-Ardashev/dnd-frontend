import { SnapshotIn, t } from 'mobx-state-tree';
import { Vector3 } from 'three';

export const Location = t
	.model({
		x: t.optional(t.number, 0),
		y: t.optional(t.number, 0),
		z: t.optional(t.number, 0),
	})
	.views((self) => ({
		get getArray() {
			return Array.from(Object.values(self)) as [x: number, y: number, z: number];
		},
		get getObject() {
			return { x: self.x, y: self.y, z: self.z };
		},
		get getVector3() {
			return new Vector3(self.x, self.y, self.z);
		},
	}))
	.actions((self) => ({
		set(values: Partial<SnapshotIn<typeof self>>) {
			Object.assign(self, values);
		},
	}));
