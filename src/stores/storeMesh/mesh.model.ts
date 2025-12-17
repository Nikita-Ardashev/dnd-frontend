import { SnapshotIn, t } from 'mobx-state-tree';
import { MSTXYZ } from '../types';

export const ModelMesh = t
	.model('Mesh', {
		id: t.identifier,
		name: t.string,
		type: t.maybeNull(t.string),
		creator: t.maybeNull(t.string),
		crated_date: t.optional(t.Date, new Date()),
		fileURL: t.string,
		scale: t.maybeNull(MSTXYZ),
		position: t.maybeNull(MSTXYZ),
		rotation: t.maybeNull(MSTXYZ),
	})
	.views((self) => ({
		get getPosition() {
			const scale = self.scale?.getArray;
			const position = self.position?.getArray;
			const rotation = self.rotation?.getArray;
			return { scale, position, rotation };
		},
	}))
	.actions((self) => ({
		set(values: Partial<SnapshotIn<typeof self>>) {
			Object.assign(self, values);
		},
	}));

export const ModelGroupMesh = t
	.model({
		id: t.identifier,
		name: t.string,
		type: t.string,
		meshes: t.array(t.string),
	})
	.actions((self) => ({
		set(values: Partial<SnapshotIn<typeof self>>) {
			Object.assign(self, values);
		},
		addMesh(id: string) {
			self.meshes.push(id);
		},
		removeMesh(id: string) {
			self.meshes.remove(id);
		},
	}));
