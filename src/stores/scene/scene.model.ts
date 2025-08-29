import { SnapshotIn, t } from 'mobx-state-tree';
import { ModelMesh } from '../mesh/mesh.model';

export const ModelScene = t
	.model({
		isViewGrid: t.optional(t.boolean, true),
		isEditable: t.optional(t.boolean, true),
		isControl: t.optional(t.boolean, true),
		meshes: t.array(ModelMesh),
	})
	.actions((self) => ({
		setIsControl(state: boolean) {
			self.isControl = state;
		},
		setIsViewGrid(state: boolean) {
			self.isViewGrid = state;
		},
		setIsEditable(state: boolean) {
			self.isEditable = state;
		},
		addMesh(mesh: SnapshotIn<(typeof self.meshes)[number]>) {
			self.meshes.push(mesh);
		},
	}));
