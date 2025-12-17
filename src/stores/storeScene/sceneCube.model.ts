import { SnapshotIn, t } from 'mobx-state-tree';
import { MSTXYZ } from '../types';
import { generateUUID } from 'three/src/math/MathUtils.js';

export type TypesTextureMap = {
	map?: string;
	lightMap?: string;
	aoMap?: string;
	emissiveMap?: string;
	bumpMap?: string;
	normalMap?: string;
	displacementMap?: string;
	roughnessMap?: string;
	metalnessMap?: string;
	alphaMap?: string;
	envMap?: string;
};

export const ModelSceneCube = t
	.model('SceneCube', {
		id: t.optional(t.identifier, generateUUID()),
		position: t.optional(MSTXYZ, { x: 0, y: 0, z: 0 }),
		textureUrls: t.optional(t.frozen<TypesTextureMap>(), {}),
	})
	.actions((self) => ({
		move() {
			return self;
		},
	}));

export const ModelSceneCubes = t
	.model('SceneCubes', {
		cubes: t.array(ModelSceneCube),
	})
	.actions((self) => ({
		addCell(position: SnapshotIn<typeof MSTXYZ>) {
			if (
				self.cubes.some(
					(cube) =>
						cube.position.x === position.x &&
						cube.position.y === position.y &&
						cube.position.z === position.z,
				)
			)
				return;

			const cube = { position, id: generateUUID() };
			self.cubes.push(cube);
			return cube;
		},
		removeCell(id: string) {
			const cube = self.cubes.find((c) => c.id === id);
			if (cube === undefined) return;
			self.cubes.remove(cube);
			return cube;
		},
	}));
