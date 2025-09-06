import { SnapshotIn, t } from 'mobx-state-tree';
import { MSTXYZ } from '../types';
import { generateUUID } from 'three/src/math/MathUtils.js';

export const ModelGridCell = t
	.model({
		id: t.identifier,
		position: MSTXYZ,
	})
	.actions((self) => ({
		move() {
			return self;
		},
	}));

export const ModelGrid = t
	.model({
		cells: t.array(ModelGridCell),
	})
	.actions((self) => ({
		addCell(position: SnapshotIn<typeof MSTXYZ>) {
			self.cells.push({ position, id: generateUUID() });
		},
		removeCell(id: string) {
			const cell = self.cells.find((c) => c.id === id);
			if (cell === undefined) return;
			self.cells.remove(cell);
		},
	}));
