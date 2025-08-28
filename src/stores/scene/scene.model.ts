import { Instance, t } from 'mobx-state-tree';
import { ModelHistory } from '../history/history.model';
import { ModelMesh } from '../mesh/mesh.model';

export const ModelScene = t
	.compose(
		t.model({
			isViewGrid: t.optional(t.boolean, true),
			isEditable: t.optional(t.boolean, true),
			isControl: t.optional(t.boolean, true),
		}),
		ModelHistory,
	)
	.views((self) => ({
		get getCurrentChanges() {
			return self.getCurrent as Instance<typeof ModelMesh>[];
		},
	}))
	.actions((self) => ({
		setIsControl(state: boolean) {
			self.isControl = state;
		},
	}));
