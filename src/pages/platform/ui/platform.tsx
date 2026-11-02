import styles from './platform.module.sass';
import { ToolbarScene } from '@/features/select-tool';
import { Layers } from '@/widgets/layers';
import { Notes } from '@/widgets/notes';
import { SceneViewport } from '@/widgets/scene-viewport';
import { Sources } from '@/widgets/sources';

export function Platform() {
	return (
		<div className={styles.page}>
			<Sources />
			<SceneViewport toolbar={<ToolbarScene />} />
			<Layers />
			<Notes />
		</div>
	);
}
