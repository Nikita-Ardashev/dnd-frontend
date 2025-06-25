import { Scene } from '@/components/scene';
import React from 'react';
import styles from './page.module.sass';

export default function Constructor() {
	return (
		<div className={styles.page__constructor}>
			{/* <div className={styles.page__constructor_snippets}></div> */}
			<Scene>
				<mesh>
					<boxGeometry args={[1, 1, 1]} />
					<meshBasicMaterial color={'blue'} />
				</mesh>
			</Scene>
		</div>
	);
}
