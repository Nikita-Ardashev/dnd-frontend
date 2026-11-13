'use client';

import { observer } from 'mobx-react-lite';
import { ReactNode } from 'react';

import { useStoreScene } from '@/entities/scene';

import { SceneCanvas } from './scene-canvas';

import styles from './scene-viewport.module.sass';

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
