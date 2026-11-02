import { t } from 'mobx-state-tree';
import { MMesh } from './mesh';
import { MTexture } from '@/shared/lib/mst';
import { withMatrix4 } from '@/shared/lib/mst';

export const MCubeMesh = withMatrix4(
	t.compose(
		'CubeMesh',
		MMesh,
		t.model({
			textures: t.maybeNull(MTexture),
		}),
	),
);
