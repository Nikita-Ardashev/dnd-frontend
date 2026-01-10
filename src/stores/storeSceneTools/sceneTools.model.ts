import { recurseSearch, setMSTModelRecurseChildren } from '@/stores/utils/recurseChildren';
import { ISimpleType, t } from 'mobx-state-tree';
import { TypeLiteralTools } from './types';

export const MSTTypeLiteralTools = t.union<ISimpleType<TypeLiteralTools>[]>(
	t.literal('transform'),
	t.literal('scale'),
	t.literal('drag'),
	t.literal('rotate'),
	t.literal('move'),
	t.literal('build'),
	t.literal('newBuild'),
);

const ToolProps = {
	id: t.identifier,
	name: t.optional(MSTTypeLiteralTools, 'move'),
	isScale: t.optional(t.boolean, false),
	isDrag: t.optional(t.boolean, false),
	isRotate: t.optional(t.boolean, false),
	isMove: t.optional(t.boolean, false),
	isBuild: t.optional(t.boolean, false),
	isNewBuild: t.optional(t.boolean, false),
	iconURL: t.optional(t.string, '/not-found.svg'),
};

export const ModelTool = setMSTModelRecurseChildren(ToolProps, 'Tool');

export const ModelSceneTools = t
	.model('Tools', {
		tools: t.refinement(t.array(ModelTool), (arr) => arr!.length > 0),
		currentId: t.string,
	})
	.views((self) => ({
		get getTools() {
			return self.tools;
		},
		get getCurrent() {
			return recurseSearch(self.tools, self.currentId) || self.tools[0];
		},
	}))
	.actions((self) => ({
		setCurrent(toolId: string) {
			self.currentId = toolId;
		},
	}));
