import { IMSTMap, IType } from 'mobx-state-tree';

export const ArrayWithObjectToMap = <T extends { id: string | number }>(array: T[]) => {
	return new Map(array.map((a) => [a.id, a]));
};

export const MapToArray = <T>(map: Map<string | number, T>) => {
	return Array.from(map.values());
};

export const MSTMapToArray = <T>(map: IMSTMap<IType<unknown, unknown, T>>) => {
	return Array.from(map.values());
};
