import { SnapshotIn, t } from 'mobx-state-tree';
import { ModelMesh } from '../storeMesh/mesh.model';
import { ModelSceneCubes } from './sceneCube.model';

export const ModelScene = t
	.model('Scene', {
		isViewGrid: t.optional(t.boolean, true),
		isEditable: t.optional(t.boolean, true),
		selectedMeshIds: t.array(t.union(t.number, t.string)),
		meshes: t.array(ModelMesh),
		sceneCubes: t.optional(ModelSceneCubes, { cubes: [] }),
		size: t.optional(t.model({ width: t.number, height: t.number }), {
			width: 20,
			height: 20,
		}),
	})
	.views((self) => ({
		getMesh(meshId: string) {
			return self.meshes.find((m) => m.id === meshId);
		},
		getIsSelectedMesh(meshId: number | string) {
			return self.selectedMeshIds.some((id) => id === meshId);
		},
	}))
	.actions((self) => ({
		addSelectedMeshId(meshId: number | string) {
			if (self.getIsSelectedMesh(meshId)) return;
			self.selectedMeshIds.push(meshId);
		},
		removeSelectedMeshId(meshId: number | string) {
			self.selectedMeshIds.remove(meshId);
		},
		setIsViewGrid(state?: boolean) {
			self.isViewGrid = state === undefined ? !self.isViewGrid : state;
		},
		setIsEditable(state?: boolean) {
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
