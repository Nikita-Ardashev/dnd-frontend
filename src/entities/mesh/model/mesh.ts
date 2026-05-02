import { withMatrix4 } from '@/shared/lib/mst/with-placement';
import { IAnyType, t } from 'mobx-state-tree';

export interface ITextureMap {
	map?: string;
	lightMap?: string;
	aoMap?: string;
	emissiveMap?: string;
	bumpMap?: string;
	normalMap?: string;
	displacementMap?: string;
	roughnessMap?: string;
	metalnessMap?: string;
	alphaMap?: string;
	envMap?: string;
}

export const MTexture = t.model<Record<keyof ITextureMap, IAnyType>>('Texture', {
	map: t.maybe(t.string),
	lightMap: t.maybe(t.string),
	aoMap: t.maybe(t.string),
	emissiveMap: t.maybe(t.string),
	bumpMap: t.maybe(t.string),
	normalMap: t.maybe(t.string),
	displacementMap: t.maybe(t.string),
	roughnessMap: t.maybe(t.string),
	metalnessMap: t.maybe(t.string),
	alphaMap: t.maybe(t.string),
	envMap: t.maybe(t.string),
});

export const MMesh = withMatrix4(
	t.model('Mesh', {
		id: t.identifier,
	}),
);

export const MModelMesh = t.compose(
	'ModelMesh',
	MMesh,
	t.model({
		type: t.maybeNull(t.string),
		creator: t.optional(t.string, 'root'),
		crated_date: t.optional(t.Date, new Date()),
		name: t.string,
		fileURL: t.string,
		fileCache: t.maybe(t.string),
		sizes: t.optional(t.model({ max: t.array(t.number), min: t.array(t.number) }), {
			max: [0, 0, 0],
			min: [0, 0, 0],
		}),
		preview: t.string,
	}),
);

export const MCubeMesh = t.compose(
	'CubeMesh',
	MMesh,
	t.model({
		textureUrls: t.optional(MTexture, {}),
		textureCaches: t.array(t.string),
	}),
);
