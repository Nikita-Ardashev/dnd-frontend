import styles from './platform.module.sass';
import { Scene } from '@/features/scene';
import { ToolbarScene } from '@/features/toolbar';

export function Platform() {
	return (
		<div className={styles.page}>
			<Scene toolbar={<ToolbarScene />} />
		</div>
	);
}
