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

export const MTexture = t
	.model('Texture', {
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
	})
	.views((self) => ({
		get getTextureMap() {
			const textureMap: ITextureMap = {};
			if (self.map) textureMap.map = self.map.getSource;
			if (self.lightMap) textureMap.lightMap = self.lightMap.getSource;
			if (self.aoMap) textureMap.aoMap = self.aoMap.getSource;
			if (self.emissiveMap) textureMap.emissiveMap = self.emissiveMap.getSource;
			if (self.bumpMap) textureMap.bumpMap = self.bumpMap.getSource;
			if (self.normalMap) textureMap.normalMap = self.normalMap.getSource;
			if (self.displacementMap)
				textureMap.displacementMap = self.displacementMap.getSource;
			if (self.roughnessMap) textureMap.roughnessMap = self.roughnessMap.getSource;
			if (self.metalnessMap) textureMap.metalnessMap = self.metalnessMap.getSource;
			if (self.alphaMap) textureMap.alphaMap = self.alphaMap.getSource;
			if (self.envMap) textureMap.envMap = self.envMap.getSource;
			return textureMap;
		},
	}));
