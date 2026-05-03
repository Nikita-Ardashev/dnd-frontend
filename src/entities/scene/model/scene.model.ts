import { t } from 'mobx-state-tree';
import { Construct } from './construct/construct.model';
import { SceneTools } from './editor/scene-tools.model';
import { CameraControls } from './editor/camera-controls.model';

export const Scene = t
	.model('Scene', {
		isViewGrid: t.optional(t.boolean, true),
		isEditable: t.optional(t.boolean, true),
		activeModelId: t.maybe(t.string),
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
		getIsSelectedMesh(id: string) {
			return self.selectedMeshIds.some((v) => v === id);
		},
		getSelectedMeshes() {
			return self.selectedMeshIds.map(
				(id) => self.construct.getCubeById(id) ?? self.construct.getModelById(id),
			);
		},
		get getActiveModelId() {
			return self.activeModelId;
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
		setActiveModelId(id?: string) {
			self.activeModelId = id;
			self.camera.setEnabled(id !== undefined ? false : true);
		},
	}));
