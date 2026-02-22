import { SnapshotIn, t } from 'mobx-state-tree';
import { SceneCube } from './scene-cube.model';
import { SceneModel } from './scene-models.model';
import { generateUUID } from 'three/src/math/MathUtils.js';
import { matrix4Compose } from '@/shared/lib/three/matrix4-compose';

export const Construct = t
	.model('Construct', {
		sceneModels: t.map(SceneModel),
		sceneCubes: t.map(SceneCube),
	})
	.views((self) => ({
		getModel(id: string) {
			return self.sceneModels.get(id);
		},
		getCubeById(id: string) {
			return self.sceneCubes.get(id);
		},
		get getModelsArray() {
			return Array.from(self.sceneModels.values());
		},
		get getCubesArray() {
			return Array.from(self.sceneCubes.values());
		},
	}))
	.actions((self) => ({
		addModel(mesh: SnapshotIn<typeof SceneModel>) {
			self.sceneModels.set(mesh.id, mesh);
		},
		deleteModel(id: string) {
			self.sceneModels.delete(id);
		},
		addCell(position: number[]) {
			type TCube = SnapshotIn<typeof SceneCube>;
			const cube: TCube = {
				id: generateUUID(),
			};
			const rotation = [0, 0, 0];
			const scale = [1, 1, 1];
			const matrix = matrix4Compose({ position, rotation, scale });

			cube.matrix4 = matrix.toArray();

			self.sceneCubes.set(cube.id!, cube);
			return cube;
		},
		removeCell(id: string) {
			self.sceneCubes.delete(id);
		},
		setModelsFromArray(array: (typeof SceneModel)[]) {
			self.sceneModels.replace(array);
		},
		setCubesFromArray(array: (typeof SceneCube)[]) {
			self.sceneModels.replace(array);
		},
	}));
