import { SnapshotIn } from 'mobx-state-tree';
import { SceneTools } from '../model/editor/scene-tools.model';

type TToolsSnapshot = SnapshotIn<typeof SceneTools>;

/** Набор инструментов редактора по умолчанию; первый — активный. */
export const createDefaultTools = (): TToolsSnapshot => {
	const moveToolId = crypto.randomUUID();

	return {
		currentId: moveToolId,
		tools: [
			{
				id: moveToolId,
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
	};
};
