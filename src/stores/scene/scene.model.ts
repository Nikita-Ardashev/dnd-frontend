import { t } from 'mobx-state-tree';

const MSTPosition = t.refinement(t.array(t.number), (arr) => {
	if (arr === undefined) return false;
	return arr.length <= 3;
});

export const SceneCellModel = t.model({
	position: MSTPosition,
	rotation: MSTPosition,
});

export const SceneModel = t.model({
	id: t.string,
	isViewGrid: t.boolean,
	isEditable: t.boolean,
});
