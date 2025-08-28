import { t } from 'mobx-state-tree';

export const ModelHistory = t
	.model({
		history: t.array(t.frozen()),
		currentIndex: t.optional(
			t.refinement(t.number, (value) => value >= 0),
			0,
		),
	})
	.views((self) => ({
		get getCurrent() {
			return self.history[self.currentIndex];
		},
	}))
	.actions((self) => ({
		undo() {
			self.currentIndex = Math.max(self.currentIndex - 1, 0);
		},
		redo() {
			self.currentIndex = Math.min(self.history.length, self.currentIndex + 1);
		},
		newStep(value: unknown) {
			if (self.currentIndex !== self.history.length - 1) {
				self.history.splice(self.currentIndex);
			}
			self.history.push(value);
		},
	}));
