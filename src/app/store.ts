import { SnapshotIn, t } from 'mobx-state-tree';
import { handlerKeys } from '@/shared/utils/handler-keys';
import { withHistory } from '@/shared/lib/mst/with-history';
import { Profile } from '@/entities/profile/model/profile.model';
import { Scene } from '@/entities/scene/model';

export const Root = t.model('Root', {
	scene: Scene,
	profile: Profile,
});

const DEFAULT_MESHES: SnapshotIn<typeof Scene.properties.construct.properties.sceneModels> =
	{
		'1': {
			id: '1',
			name: 'mesh test',
			fileURL: '/local_models/fantasy_scene_stufs_lowpoly_1/scene.gltf',
			matrix4: [0.01, 0, 0, 0, 0, 0.01, 0, 0, 0, 0, 0.01, 0, 4, 0, 0, 1],
		},
	};

const DEFAULT_TOOL_ID = crypto.randomUUID();

export const RootStore = Root.create({
	profile: {},
	scene: {
		camera: {},
		construct: {
			sceneModels: DEFAULT_MESHES,
			sceneCubes: {
				'2': {
					id: '2',
					textureUrls: {
						normalMap:
							'/local_models/fantasy_walls_and_floors/textures/pillar_wood_normal.png',
						map: '/local_models/fantasy_walls_and_floors/textures/pillar_wood_baseColor.jpeg',
					},
					matrix4: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				},
			},
		},
		tools: {
			currentId: DEFAULT_TOOL_ID,
			tools: [
				{
					id: DEFAULT_TOOL_ID,
					name: 'move',
					iconURL: '/move.svg',
					isMove: true,
					isAvailableUse: true,
				},
				{
					id: crypto.randomUUID(),
					name: 'build',
					iconURL: '/build-cube.svg',
					isBuild: true,
					children: [
						{ id: crypto.randomUUID(), name: 'newBuild', isNewBuild: true },
					],
				},
				{
					id: crypto.randomUUID(),
					name: 'drag',
					iconURL: '/drag.svg',
					isDrag: true,
				},
				{
					id: crypto.randomUUID(),
					name: 'axes',
					iconURL: '/axes.svg',
					isAxes: true,
				},
				{
					id: crypto.randomUUID(),
					name: 'rotate',
					iconURL: '/rotate.svg',
					isRotate: true,
				},
				{
					id: crypto.randomUUID(),
					name: 'scale',
					iconURL: '/scale.svg',
					isScale: true,
				},
				{
					id: crypto.randomUUID(),
					name: 'transform',
					iconURL: '/transform.svg',
					isRotate: true,
					isScale: true,
					isAxes: true,
				},
			],
		},
	},
});

// Объявляем добавления стора в историю
const StoreSceneHistory = withHistory(RootStore.scene.construct, [
	'/sizes/min',
	'/sizes/max',
]);

export const handlerChangeHistory = (e: KeyboardEvent) => {
	handlerKeys({
		e,
		key: 'KeyZ',
		isWithCtrl: true,
		handler: () => {
			StoreSceneHistory.undo();
		},
	});
	handlerKeys({
		e,
		key: 'KeyZ',
		isWithShift: true,
		isWithCtrl: true,
		handler: () => {
			StoreSceneHistory.redo();
		},
	});
};
