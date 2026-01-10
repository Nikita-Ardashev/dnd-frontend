import { IArrayType, IModelType, ModelProperties, t } from 'mobx-state-tree';

export const setMSTModelRecurseChildren = <T extends ModelProperties>(
	modelProps: T,
	modelName: string,
) => {
	type TModelToolProperties = T & {
		children: IArrayType<IModelType<TModelToolProperties, object>>;
	};
	const model = t.model(modelName, {
		...modelProps,
		children: t.array(
			t.late(
				(): IModelType<TModelToolProperties, object> =>
					model as IModelType<TModelToolProperties, object>,
			),
		),
	});

	return model;
};

type TItemArrayWithChildren<C> = { id: string; children: C };

export const recurseSearch = <T extends Array<TItemArrayWithChildren<T>>>(
	array: T,
	searchId: string,
): T[number] | undefined => {
	for (const item of array) {
		if (item.id === searchId) {
			return item;
		}
		if (item.children?.length) {
			const found = recurseSearch(item.children, searchId);
			if (found) return found;
		}
	}
	return undefined;
};
