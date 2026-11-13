import { t } from 'mobx-state-tree';

import { withMatrix4 } from '@/shared/lib/mst';

import { MMesh } from './mesh';
import { MTexture } from './texture';

export const MCubeMesh = withMatrix4(
	t.compose(
		'CubeMesh',
		MMesh,
		t.model({
			textures: t.maybeNull(MTexture),
		}),
	),
);
