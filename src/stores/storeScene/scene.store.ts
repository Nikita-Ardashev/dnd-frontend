import { SnapshotIn } from 'mobx-state-tree';
import { ModelScene } from './scene.model';
import { ModelMesh } from '../storeMesh/mesh.model';
import { ModelHistory } from '../storeHistory/history.model';

const DEFAULT_MESHES: SnapshotIn<typeof ModelMesh>[] = [
	{
		id: '1',
		name: 'mesh test',
		fileURL: '/local_models/medieval_pack_-_wood_set_1/scene.gltf',
	},
];

export const StoreScene = ModelScene.create({
	meshes: DEFAULT_MESHES,
	sceneCubes: {
		cubes: [
			{
				textureUrls: {
					normalMap:
						'/local_models/fantasy_walls_and_floors/textures/pillar_wood_normal.png',
					map: '/local_models/fantasy_walls_and_floors/textures/pillar_wood_baseColor.jpeg',
				},
			},
		],
	},
});

export const StoreSceneHistory = ModelHistory(StoreScene);
