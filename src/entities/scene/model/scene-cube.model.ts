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

export const Texture = t.model<Record<keyof ITextureMap, IAnyType>>('Texture', {
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

export const SceneCube = withMatrix4(
	t.model('SceneCube', {
		id: t.identifier,
		textureUrls: t.optional(Texture, {}),
	}),
);
