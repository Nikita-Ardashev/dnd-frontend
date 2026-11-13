import { t } from 'mobx-state-tree';

export const MMesh = t
	.model('Mesh', {
		id: t.identifier,
		isHovered: t.optional(t.boolean, false),
	})
	.actions((self) => ({
		setHovered(isHovered: boolean) {
			self.isHovered = isHovered;
		},
	}));
