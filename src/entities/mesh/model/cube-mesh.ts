import { t } from 'mobx-state-tree';
import { MMesh } from './mesh';
import { MTexture } from '@/shared/lib/mst';

export const MCubeMesh = t.compose(
	'CubeMesh',
	MMesh,
	t.model({
		textures: t.maybeNull(MTexture),
	}),
);
