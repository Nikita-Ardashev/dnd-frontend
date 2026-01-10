import { IAnyType, SnapshotIn, t } from 'mobx-state-tree';
import { MSTXYZ } from '../types';
import { generateUUID } from 'three/src/math/MathUtils.js';

export interface ITextureMap {
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
}

export const ModelTexture = t.model<Record<keyof ITextureMap, IAnyType>>('SceneTexture', {
	map: t.maybe(t.string),
	lightMap: t.maybe(t.string),
	aoMap: t.maybe(t.string),
	emissiveMap: t.maybe(t.string),
	bumpMap: t.maybe(t.string),
	normalMap: t.maybe(t.string),
	displacementMap: t.maybe(t.string),
	roughnessMap: t.maybe(t.string),
	metalnessMap: t.maybe(t.string),
	alphaMap: t.maybe(t.string),
	envMap: t.maybe(t.string),
});

export const ModelSceneCube = t
	.model('SceneCube', {
		id: t.optional(t.identifier, generateUUID()),
		position: t.optional(MSTXYZ, { x: 0, y: 0, z: 0 }),
		textureUrls: t.optional(ModelTexture, {}),
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
