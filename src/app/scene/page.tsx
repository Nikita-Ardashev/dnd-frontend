import { Scene } from '@/features/scene';
import React from 'react';
import styles from './page.module.sass';

export default function ScenePage() {
	return (
		<div className={styles.page__constructor}>
			<div className={styles.page__constructor_snippets}></div>
			<Scene> </Scene>
		</div>
	);
}
