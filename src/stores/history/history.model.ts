import { applyPatch, IJsonPatch, IStateTreeNode, onPatch, t } from 'mobx-state-tree';

export const ModelHistory = (store: IStateTreeNode) => {
	const StoreHistory = t
		.model({
			currentIndex: t.optional(t.number, -1),
			isNowChange: t.optional(t.boolean, false),
		})
		.volatile(() => ({
			path: [] as IJsonPatch[],
			reversePath: [] as IJsonPatch[],
		}))
		.actions((self) => ({
			addToHistory(path: IJsonPatch, reversePath: IJsonPatch) {
				if (self.isNowChange) {
					self.isNowChange = false;
					return;
				}

				self.path.splice(self.currentIndex + 1, Infinity, path);
				self.reversePath.splice(self.currentIndex + 1, Infinity, reversePath);
				self.currentIndex = self.path.length - 1;
			},
			undo() {
				if (self.currentIndex < 0) return;
				self.isNowChange = true;
				const path = self.reversePath[self.currentIndex];
				self.currentIndex--;
				applyPatch(store, path);
			},
			redo() {
				if (self.currentIndex >= self.path.length - 1) return;
				self.isNowChange = true;
				self.currentIndex++;
				const path = self.path[self.currentIndex];
				console.log(path);
				applyPatch(store, path);
			},
		}))
		.create({});

	onPatch(store, (path, reversePath) => {
		StoreHistory.addToHistory(path, reversePath);
	});

	return StoreHistory;
};
