import styles from './platform.module.sass';
import { Scene } from '@/features/scene/index';

export function Platform() {
	return (
		<div className={styles.page}>
			<Scene></Scene>
		</div>
	);
}
