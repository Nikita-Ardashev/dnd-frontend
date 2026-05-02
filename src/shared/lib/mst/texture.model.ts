import { t } from 'mobx-state-tree';
import { MUrlOrCache } from './cache';

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

export const MTexture = t.model('Texture', {
	map: t.maybe(MUrlOrCache),
	lightMap: t.maybe(MUrlOrCache),
	aoMap: t.maybe(MUrlOrCache),
	emissiveMap: t.maybe(MUrlOrCache),
	bumpMap: t.maybe(MUrlOrCache),
	normalMap: t.maybe(MUrlOrCache),
	displacementMap: t.maybe(MUrlOrCache),
	roughnessMap: t.maybe(MUrlOrCache),
	metalnessMap: t.maybe(MUrlOrCache),
	alphaMap: t.maybe(MUrlOrCache),
	envMap: t.maybe(MUrlOrCache),
});
