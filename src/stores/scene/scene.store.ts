import { SnapshotIn } from 'mobx-state-tree';
import { ModelScene } from './scene.model';
import { ModelMesh } from '../mesh/mesh.model';
import { ModelHistory } from '../history/history.model';

const DEFAULT_MESHES: SnapshotIn<typeof ModelMesh>[] = [
	{
		id: '1',
		name: 'mesh test',
		fileURL: '/api/models/barrel/gltf/medieval_barrel.gltf',
		scale: { x: 0.1, y: 0.1, z: 0.1 },
	},
];

export const StoreScene = ModelScene.create({ meshes: DEFAULT_MESHES });

export const StoreSceneHistory = ModelHistory(StoreScene);
