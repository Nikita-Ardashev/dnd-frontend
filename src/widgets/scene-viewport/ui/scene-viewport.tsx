'use client';

import styles from './scene-viewport.module.sass';
import { observer } from 'mobx-react-lite';
import { useStoreScene } from '@/entities/scene';
import { ReactNode } from 'react';
import { SceneCanvas } from './scene-canvas';

interface IProps {
	toolbar?: ReactNode;
}

export const SceneViewport = observer(function SceneViewport({ toolbar }: IProps) {
	const { isMove } = useStoreScene().tools.getCurrent;

	return (
		<div className={`${styles.scene} ${isMove ? styles.scene__is_move : ''}`}>
			{toolbar && <div className={styles.scene__tools}>{toolbar}</div>}
			<SceneCanvas />
		</div>
	);
});
