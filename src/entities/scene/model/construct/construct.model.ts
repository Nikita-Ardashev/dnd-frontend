import { SnapshotIn, t } from 'mobx-state-tree';
import { generateUUID } from 'three/src/math/MathUtils.js';
import { matrix4Compose } from '@/shared/lib/three';
import { MCubeMesh, MModelInternalMesh } from '@/entities/mesh/@x/scene';

export const Construct = t
	.model('Construct', {
		models: t.map(MModelInternalMesh),
		cubes: t.map(MCubeMesh),
	})
	.views((self) => ({
		getModelById(id: string) {
			return self.models.get(id);
		},
		getCubeById(id: string) {
			return self.cubes.get(id);
		},
		get getModelsArray() {
			return Array.from(self.models.values());
		},
		get getCubesArray() {
			return Array.from(self.cubes.values());
		},
	}))
	.actions((self) => ({
		addModel(mesh: SnapshotIn<typeof MModelInternalMesh>) {
			self.models.set(mesh.id, mesh);
		},
		deleteModel(id: string) {
			self.models.delete(id);
		},
		addCell(position: number[]) {
			type TCube = SnapshotIn<typeof MCubeMesh>;
			const cube: TCube = {
				id: generateUUID(),
			};
			const rotation = [0, 0, 0];
			const scale = [1, 1, 1];
			const matrix = matrix4Compose({ position, rotation, scale });

			cube.matrix4 = matrix.toArray();

			self.cubes.set(cube.id!, cube);
			return cube;
		},
		removeCell(id: string) {
			self.cubes.delete(id);
		},
		setModelsFromArray(array: (typeof MModelInternalMesh)[]) {
			self.models.replace(array);
		},
		setCubesFromArray(array: (typeof MCubeMesh)[]) {
			self.cubes.replace(array);
		},
	}));
