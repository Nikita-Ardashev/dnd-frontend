import { t } from 'mobx-state-tree';

export const ModelCameraControls = t
	.model({
		azimuthAngle: t.optional(t.number, 1),
		polarAngle: t.optional(t.number, 1),
		distance: t.optional(t.number, 20),
		maxDistance: t.optional(t.number, 40),
		minDistance: t.optional(t.number, 2),
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
