import { applyPatch, IJsonPatch, IStateTreeNode, onPatch, t } from 'mobx-state-tree';

export const ModelHistory = (store: IStateTreeNode) => {
	const StoreHistory = t
		.model({
			currentIndex: t.optional(t.number, -1),
			isNowChange: t.optional(t.boolean, false),
		})
		.volatile(() => ({
			history: [] as IJsonPatch[],
		}))
		.actions((self) => ({
			addToHistory(path: IJsonPatch) {
				if (self.isNowChange) {
					self.isNowChange = false;
					return;
				}

				self.history.splice(self.currentIndex + 1, Infinity, path);
				self.currentIndex = self.history.length - 1;
				console.table(self.history);
			},
			undo() {
				if (self.currentIndex <= 0) return;
				self.isNowChange = true;
				const index = --self.currentIndex;
				const path = self.history[index];

				applyPatch(store, path);
			},
			redo() {
				if (self.currentIndex >= self.history.length - 1) return;
				self.isNowChange = true;
				const index = ++self.currentIndex;
				const path = self.history[index];
				applyPatch(store, path);
			},
		}))
		.create({});

	onPatch(store, (path, reversePath) => {
		StoreHistory.addToHistory(reversePath);
	});

	return StoreHistory;
};
