import { SnapshotIn, t } from 'mobx-state-tree';

export const MSTXYZ = t
	.model({
		x: t.number,
		y: t.number,
		z: t.number,
	})
	.views((self) => ({
		get getArray() {
			return Array.from(Object.values(self)) as [number, number, number];
		},
	}))
	.actions((self) => ({
		set(values: Partial<SnapshotIn<typeof self>>) {
			Object.assign(self, values);
		},
	}));
