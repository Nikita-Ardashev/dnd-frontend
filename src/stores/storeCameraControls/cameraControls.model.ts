import { t } from 'mobx-state-tree';

export const ModelCameraControls = t
	.model({
		azimuthAngle: t.optional(t.number, 0),
		polarAngle: t.optional(t.number, 1),
		distance: t.optional(t.number, 10),
		maxDistance: t.optional(t.number, 100),
		minDistance: t.optional(t.number, 0),
	})
	.views((self) => ({
		get get() {
			return self;
		},
	}))
	.actions((self) => ({
		set(props: Partial<typeof self>) {
			Object.assign(self, props);
		},
	}));
