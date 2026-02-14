'use client';

import styles from './scene.module.sass';
import { observer } from 'mobx-react-lite';
import { Toolbar } from '../../toolbar';
import { useStore } from '@/shared/lib/mst/hooks';
import { SceneCanvas } from '@/entities/scene/ui';

export const Scene = observer(function Scene() {
	const { scene } = useStore();
	const { isMove } = scene.tools.getCurrent;

	return (
		<div className={`${styles.scene} ${isMove ? styles.scene__is_move : ''}`}>
			<div className={styles.scene__tools}>
				<Toolbar />
			</div>
			<SceneCanvas />
		</div>
	);
});
