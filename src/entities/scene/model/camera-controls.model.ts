import { t } from 'mobx-state-tree';

export const CameraControls = t
	.model({
		azimuthAngle: t.optional(t.number, 0),
		polarAngle: t.optional(t.number, 1),
		distance: t.optional(t.number, 10),
		maxDistance: t.optional(t.number, 100),
		minDistance: t.optional(t.number, 0),
	})
	.actions((self) => ({
		setAnyProps(props: Partial<typeof self>) {
			Object.assign(self, props);
		},
	}));
