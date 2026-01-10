import { generateUUID } from 'three/src/math/MathUtils.js';
import { ModelSceneTools } from './sceneTools.model';

const DEFAULT_TOOL_ID = generateUUID();

export const StoreSceneTools = ModelSceneTools.create({
	currentId: DEFAULT_TOOL_ID,
	tools: [
		{ id: DEFAULT_TOOL_ID, name: 'move', iconURL: '/move.svg', isMove: true },
		{
			id: generateUUID(),
			name: 'build',
			iconURL: '/build-cube.svg',
			isBuild: true,
			children: [{ id: generateUUID(), name: 'newBuild', isNewBuild: true }],
		},
		{ id: generateUUID(), name: 'drag', iconURL: '/drag.svg', isDrag: true },
		{ id: generateUUID(), name: 'rotate', iconURL: '/rotate.svg', isRotate: true },
		{ id: generateUUID(), name: 'scale', iconURL: '/scale.svg', isScale: true },
		{
			id: generateUUID(),
			name: 'transform',
			iconURL: '/transform.svg',
			isRotate: true,
			isScale: true,
			isDrag: true,
		},
	],
});
