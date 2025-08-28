import { SnapshotIn } from 'mobx-state-tree';
import { ModelScene } from './scene.model';
import { ModelMesh } from '../mesh/mesh.model';

export const StoreScene = ModelScene.create({
	history: [
		[
			{
				id: '1',
				name: 'mesh test',
				fileURL: '/api/models/barrel/gltf/medieval_barrel.gltf',
				scale: { x: 0.1, y: 0.1, z: 0.1 },
			} as SnapshotIn<typeof ModelMesh>,
		],
	],
});
