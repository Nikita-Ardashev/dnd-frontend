import { t } from 'mobx-state-tree';
import { Construct } from './construct.model';
import { SceneTools } from './scene-tools.model';
import { CameraControls } from './camera-controls.model';

export const Scene = t
	.model('Scene', {
		isViewGrid: t.optional(t.boolean, true),
		isEditable: t.optional(t.boolean, true),
		selectedMeshIds: t.array(t.string),
		construct: Construct,
		size: t.optional(t.model({ width: t.number, height: t.number }), {
			width: 20,
			height: 20,
		}),
		tools: SceneTools,
		camera: CameraControls,
	})
	.views((self) => ({
		getIsSelectedMesh(id: number | string) {
			return self.selectedMeshIds.some((v) => v === id);
		},
	}))
	.actions((self) => ({
		addSelectedByMesh(id: string) {
			if (self.getIsSelectedMesh(id)) return;
			self.selectedMeshIds.push(id);
		},
		removeSelectedMesh(id: string) {
			self.selectedMeshIds.remove(id);
		},
		setIsViewGrid(state?: boolean) {
			self.isViewGrid = state === undefined ? !self.isViewGrid : state;
		},
		setIsEditable(state?: boolean) {
			self.isEditable = state === undefined ? !self.isEditable : state;
		},
	}));
