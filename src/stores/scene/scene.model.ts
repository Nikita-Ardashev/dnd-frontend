import { SnapshotIn, t } from 'mobx-state-tree';
import { ModelMesh } from '../mesh/mesh.model';
import { ModelGrid } from '../grid/grid.model';

const DEFAULT_GRID_CELLS: SnapshotIn<typeof ModelGrid.properties.cells> = [
	{ id: '1', position: { x: 0, y: 0, z: 1 } },
	{ id: '2', position: { x: 1, y: 0, z: 1 } },
	{ id: '3', position: { x: 2, y: 0, z: 1 } },
	{ id: '4', position: { x: 3, y: 0, z: 1 } },
	{ id: '5', position: { x: 0, y: 0, z: 2 } },
	{ id: '6', position: { x: 1, y: 0, z: 2 } },
	{ id: '7', position: { x: 2, y: 0, z: 2 } },
	{ id: '8', position: { x: 3, y: 0, z: 2 } },
	{ id: '9', position: { x: 0, y: 0, z: 3 } },
	{ id: '10', position: { x: 1, y: 0, z: 3 } },
	{ id: '11', position: { x: 2, y: 0, z: 3 } },
	{ id: '12', position: { x: 3, y: 0, z: 3 } },
	{ id: '13', position: { x: 0, y: 0, z: 4 } },
	{ id: '14', position: { x: 1, y: 0, z: 4 } },
	{ id: '15', position: { x: 2, y: 0, z: 4 } },
	{ id: '16', position: { x: 3, y: 0, z: 4 } },
];

export const ModelScene = t
	.model({
		isViewGrid: t.optional(t.boolean, true),
		isEditable: t.optional(t.boolean, true),
		isControl: t.optional(t.boolean, true),
		meshes: t.array(ModelMesh),
		grid: t.optional(ModelGrid, { cells: DEFAULT_GRID_CELLS }),
	})
	.actions((self) => ({
		setIsControl(state: boolean | undefined = undefined) {
			self.isControl = state === undefined ? !self.isControl : state;
		},
		setIsViewGrid(state: boolean | undefined = undefined) {
			self.isViewGrid = state === undefined ? !self.isViewGrid : state;
		},
		setIsEditable(state: boolean | undefined = undefined) {
			self.isEditable = state === undefined ? !self.isEditable : state;
		},
		addMesh(mesh: SnapshotIn<(typeof self.meshes)[number]>) {
			self.meshes.push(mesh);
		},
		deleteMesh(meshId: string) {
			const mesh = self.meshes.find((m) => m.id === meshId);
			if (mesh === undefined) return;
			self.meshes.remove(mesh);
		},
	}));
