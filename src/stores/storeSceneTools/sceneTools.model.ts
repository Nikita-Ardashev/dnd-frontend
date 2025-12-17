import { IAnyType, ISimpleType, ModelPropertiesDeclaration, t } from 'mobx-state-tree';

export type TypeLiteralTools = 'transform' | 'scale' | 'drag' | 'rotate' | 'move' | 'build';

export const TypeLiteralToolsMap: Record<
	TypeLiteralTools,
	ISimpleType<TypeLiteralTools>
> = {
	transform: t.literal('transform'),
	scale: t.literal('scale'),
	drag: t.literal('drag'),
	rotate: t.literal('rotate'),
	move: t.literal('move'),
	build: t.literal('build'),
};

export const MSTTypeLiteralTools = t.union(
	TypeLiteralToolsMap.transform,
	TypeLiteralToolsMap.scale,
	TypeLiteralToolsMap.drag,
	TypeLiteralToolsMap.rotate,
	TypeLiteralToolsMap.move,
	TypeLiteralToolsMap.build,
);

export const ModelTool = t.model('Tool', {
	isTransform: t.optional(t.boolean, false),
	isScale: t.optional(t.boolean, false),
	isDrag: t.optional(t.boolean, false),
	isRotate: t.optional(t.boolean, false),
	isMove: t.optional(t.boolean, false),
	isBuild: t.optional(t.boolean, false),
	iconURL: t.string,
});

export const ModelTransform = t.compose(
	ModelTool,
	t.model('Transform', {
		name: t.optional(TypeLiteralToolsMap.transform, 'transform'),
		isTransform: t.optional(t.boolean, true),
	}),
);

export const ModelScale = t.compose(
	ModelTool,
	t.model('Scale', {
		name: t.optional(TypeLiteralToolsMap.scale, 'scale'),
		isScale: t.optional(t.boolean, true),
	}),
);

export const ModelDrag = t.compose(
	ModelTool,
	t.model('Drag', {
		name: t.optional(TypeLiteralToolsMap.drag, 'drag'),
		isDrag: t.optional(t.boolean, true),
	}),
);

export const ModelRotate = t.compose(
	ModelTool,
	t.model('Rotate', {
		name: t.optional(TypeLiteralToolsMap.rotate, 'rotate'),
		isRotate: t.optional(t.boolean, true),
	}),
);

export const ModelMove = t.compose(
	ModelTool,
	t.model('Move', {
		name: t.optional(TypeLiteralToolsMap.move, 'move'),
		isMove: t.optional(t.boolean, true),
	}),
);

export const ModelBuild = t.compose(
	ModelTool,
	t.model('Build', {
		name: t.optional(TypeLiteralToolsMap.build, 'build'),
		isBuild: t.optional(t.boolean, true),
	}),
);

function defineTools<
	T extends Record<TypeLiteralTools, IAnyType> & ModelPropertiesDeclaration,
>(props: T): T {
	return props;
}

const toolsProps = defineTools({
	transform: t.optional(ModelTransform, { iconURL: '/transform.svg' }),
	scale: t.optional(ModelScale, { iconURL: '/scale.svg' }),
	drag: t.optional(ModelDrag, { iconURL: '/drag.svg' }),
	rotate: t.optional(ModelRotate, { iconURL: '/rotate.svg' }),
	move: t.optional(ModelMove, { iconURL: '/move.svg' }),
	build: t.optional(ModelBuild, { iconURL: '/build-cube.svg' }),
	current: t.optional(MSTTypeLiteralTools, 'drag'),
});

export const ModelSceneTools = t
	.model('Tools', toolsProps)
	.views((self) => ({
		get getTools() {
			return [
				self.move,
				self.build,
				self.drag,
				self.scale,
				self.rotate,
				self.transform,
			];
		},
		get getCurrent() {
			return self[self.current];
		},
	}))
	.actions((self) => ({
		setCurrent(tool: TypeLiteralTools) {
			self.current = tool;
		},
	}));
