import { ISimpleType, t } from 'mobx-state-tree';

export type TypeLiteralTools =
	| 'transform'
	| 'scale'
	| 'drag'
	| 'rotate'
	| 'move'
	| 'build'
	| 'newBuild'
	| 'axes';

export const MSTTypeLiteralTools = t.union<ISimpleType<TypeLiteralTools>[]>(
	t.literal('transform'),
	t.literal('scale'),
	t.literal('drag'),
	t.literal('rotate'),
	t.literal('move'),
	t.literal('build'),
	t.literal('newBuild'),
	t.literal('axes'),
);

export const Tool = t.model('Tool', {
	id: t.identifier,
	group: t.maybeNull(t.string),
	name: t.optional(MSTTypeLiteralTools, 'move'),
	isScale: t.optional(t.boolean, false),
	isDrag: t.optional(t.boolean, false),
	isRotate: t.optional(t.boolean, false),
	isMove: t.optional(t.boolean, false),
	isBuild: t.optional(t.boolean, false),
	isNewBuild: t.optional(t.boolean, false),
	isAxes: t.optional(t.boolean, false),
	iconURL: t.optional(t.string, '/not-found.svg'),
	isAvailableUse: t.optional(t.boolean, false),
});

export const SceneTools = t
	.model('Tools', {
		tools: t.refinement(
			t.array(t.union(Tool)),
			(arr) => arr !== undefined && arr.length > 0,
		),
		currentId: t.string,
	})
	.views((self) => ({
		get getTools() {
			return self.tools;
		},
		getToolsById(id: string) {
			return self.tools.find((t) => t.id === id);
		},
		get getCurrent() {
			return self.tools.find((t) => t.id === self.currentId) || self.tools[0];
		},
	}))
	.actions((self) => ({
		setCurrent(toolId: string) {
			self.currentId = toolId;
		},
	}));
