import { t } from 'mobx-state-tree';

export const CameraControls = t
	.model({
		enabled: t.optional(t.boolean, true),
		azimuthAngle: t.optional(t.number, 0),
		polarAngle: t.optional(t.number, 1),
		distance: t.optional(t.number, 10),
		maxDistance: t.optional(t.number, 100),
		minDistance: t.optional(t.number, 0),
		realTimeZoom: t.optional(t.number, 10),
	})
	.actions((self) => ({
		setEnabled(enabled: boolean) {
			self.enabled = enabled;
		},
		setRealTimeDistance(zoom: number) {
			self.realTimeZoom = zoom;
		},
	}));
