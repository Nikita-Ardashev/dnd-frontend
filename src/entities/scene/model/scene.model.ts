import { t } from 'mobx-state-tree';
import { Construct } from './construct.model';
import { SceneTools } from './scene-tools.model';
import { CameraControls } from './camera-controls.model';

export const Scene = t
	.model('Scene', {
		isViewGrid: t.optional(t.boolean, true),
		isEditable: t.optional(t.boolean, true),
		selectedMeshIds: t.array(t.union(t.number, t.string)),
		construct: Construct,
		size: t.optional(t.model({ width: t.number, height: t.number }), {
			width: 20,
			height: 20,
		}),
		tools: SceneTools,
		camera: CameraControls,
	})
	.views((self) => ({
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
	}));
