import { ModelSceneTools, ModelTool } from './sceneTools.model';
import { Instance } from 'mobx-state-tree';

export type TypeLiteralTools =
	| 'transform'
	| 'scale'
	| 'drag'
	| 'rotate'
	| 'move'
	| 'build'
	| 'newBuild';
export type IModelTool = Instance<typeof ModelTool>;
export type IModelSceneTools = Instance<typeof ModelSceneTools>;
