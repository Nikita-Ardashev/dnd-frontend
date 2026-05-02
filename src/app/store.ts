import { Instance, SnapshotIn, t } from 'mobx-state-tree';
import { handlerKeys } from '@/shared/utils';
import { withHistory } from '@/shared/lib/mst';
import { Profile } from '@/entities/profile';
import { Scene } from '@/entities/scene';

export const Root = t.model('Root', {
	scene: Scene,
	profile: Profile,
});

// Module augmentation: расширяем IStore из shared реальным типом стора.
// shared не импортирует app — FSD не нарушается.
declare module '@/shared/lib/mst/store-context' {
	// eslint-disable-next-line @typescript-eslint/no-empty-object-type
	interface IStore extends Instance<typeof Root> {}
}

const DEFAULT_MESHES: SnapshotIn<typeof Scene.properties.construct.properties.models> = {
	'1': {
		id: '1',
		name: 'mesh test',
		file: { url: '/local_models/fantasy_scene_stufs_lowpoly_1/scene.gltf' },
		matrix4: [0.01, 0, 0, 0, 0, 0.01, 0, 0, 0, 0, 0.01, 0, 4, 0, 0, 1],
	},
	// '2': {
	// 	id: '2',
	// 	name: 'wall_low_poly',
	// 	fileURL: '/api/models/wall_low_poly/scene.gltf',
	// 	matrix4: [0.01, 0, 0, 0, 0, 0.01, 0, 0, 0, 0, 0.01, 0, 4, 0, 0, 1],
	// },
	// '3': {
	// 	id: '3',
	// 	name: 'mesh test1',
	// 	fileURL: '/local_models/1/A7RFX93BONGSZ6FU5TOZ80QB8.gltf',
	// 	matrix4: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1],
	// },
};

const DEFAULT_TOOL_ID = crypto.randomUUID();

export const RootStore = Root.create({
	profile: {},
	scene: {
		camera: {},
		construct: {
			models: DEFAULT_MESHES,
			cubes: {
				'2': {
					id: '2',
					textures: {
						normalMap: {
							url: '/local_models/fantasy_walls_and_floors/textures/pillar_wood_normal.png',
							cacheUrl: null,
						},
						map: {
							url: '/local_models/fantasy_walls_and_floors/textures/pillar_wood_baseColor.jpeg',
							cacheUrl: null,
						},
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
					group: 'cubes',
					name: 'build',
					iconURL: '/build-cube.svg',
					isBuild: true,
				},
				{
					id: crypto.randomUUID(),
					group: 'cubes',
					name: 'newBuild',
					isNewBuild: true,
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
