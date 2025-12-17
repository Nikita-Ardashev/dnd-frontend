import { SnapshotIn, t } from 'mobx-state-tree';
import { ModelMesh } from '../storeMesh/mesh.model';
import { ModelSceneCubes } from './sceneCube.model';

export const ModelScene = t
	.model('Scene', {
		isViewGrid: t.optional(t.boolean, true),
		isEditable: t.optional(t.boolean, true),
		isSelectedMesh: t.optional(t.boolean, false),
		meshes: t.array(ModelMesh),
		sceneCubes: t.optional(ModelSceneCubes, { cubes: [] }),
		size: t.optional(t.model({ width: t.number, height: t.number }), {
			width: 20,
			height: 20,
		}),
	})
	.views((self) => ({
		getMesh(id: string) {
			return self.meshes.find((m) => m.id === id);
		},
	}))
	.actions((self) => ({
		setIsSelectedMesh(state: boolean | undefined = undefined) {
			self.isSelectedMesh = state === undefined ? !self.isSelectedMesh : state;
		},
		setIsViewGrid(state: boolean | undefined = undefined) {
			self.isViewGrid = state === undefined ? !self.isViewGrid : state;
		},
		setIsEditable(state: boolean | undefined = undefined) {
			self.isEditable = state === undefined ? !self.isEditable : state;
		},
		addMesh(mesh: SnapshotIn<(typeof self.meshes)[number]>) {
			self.meshes.push(mesh);
		},
		deleteMesh(meshId: string) {
			const mesh = self.meshes.find((m) => m.id === meshId);
			if (mesh === undefined) return;
			self.meshes.remove(mesh);
		},
	}));
