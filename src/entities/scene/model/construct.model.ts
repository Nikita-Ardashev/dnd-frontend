import { SnapshotIn, t } from 'mobx-state-tree';
import { SceneCubes } from './scene-cube.model';
import { Mesh } from './mesh.model';

export const Construct = t
	.model('Construct', {
		meshes: t.array(Mesh),
		sceneCubes: t.optional(SceneCubes, { cubes: [] }),
	})
	.views((self) => ({
		getMesh(meshId: string) {
			return self.meshes.find((m) => m.id === meshId);
		},
	}))
	.actions((self) => ({
		addMesh(mesh: SnapshotIn<(typeof self.meshes)[number]>) {
			self.meshes.push(mesh);
		},
		deleteMesh(meshId: string) {
			const mesh = self.meshes.find((m) => m.id === meshId);
			if (mesh === undefined) return;
			self.meshes.remove(mesh);
		},
	}));
