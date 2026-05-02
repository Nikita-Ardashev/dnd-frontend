import { withMatrix4 } from '@/shared/lib/mst';
import { t } from 'mobx-state-tree';

export const MMesh = withMatrix4(
	t.model('Mesh', {
		id: t.identifier,
	}),
);
