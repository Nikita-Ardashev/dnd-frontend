import { Location } from '@/shared/lib/mst/location.model';
import { SnapshotIn, t } from 'mobx-state-tree';

export const Mesh = t
	.model('Mesh', {
		id: t.identifier,
		name: t.string,
		type: t.maybeNull(t.string),
		creator: t.optional(t.string, 'root'),
		crated_date: t.optional(t.Date, new Date()),
		fileURL: t.string,
		scale: t.optional(Location, { x: 0, y: 0, z: 0 }),
		position: t.optional(Location, { x: 0, y: 0, z: 0 }),
		rotation: t.optional(Location, { x: 0, y: 0, z: 0 }),
	})
	.views((self) => ({
		get getLocation() {
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

export const GroupMesh = t
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
