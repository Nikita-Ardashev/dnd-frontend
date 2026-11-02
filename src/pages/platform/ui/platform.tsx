import styles from './platform.module.sass';
import { ToolbarScene } from '@/features/toolbar';
import { Layers } from '@/widgets/layers';
import Notes from '@/widgets/notes/ui/notes';
import { Scene } from '@/widgets/scene-viewport';
import { Sources } from '@/widgets/sources';

export function Platform() {
	return (
		<div className={styles.page}>
			<Sources />
			<Scene toolbar={<ToolbarScene />} />
			<Layers />
			<Notes />
		</div>
	);
}
