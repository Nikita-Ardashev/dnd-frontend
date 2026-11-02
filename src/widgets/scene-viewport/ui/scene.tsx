'use client';

import styles from './scene.module.sass';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/shared/lib/mst';
import { SceneCanvas } from '@/entities/scene';
import { ReactNode } from 'react';

interface SceneProps {
	toolbar?: ReactNode;
}

export const Scene = observer(function Scene({ toolbar }: SceneProps) {
	const { scene } = useStore();
	const { isMove } = scene.tools.getCurrent;

	return (
		<div className={`${styles.scene} ${isMove ? styles.scene__is_move : ''}`}>
			{toolbar && <div className={styles.scene__tools}>{toolbar}</div>}
			<SceneCanvas />
		</div>
	);
});
