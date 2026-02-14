import styles from './toolbar.module.sass';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/shared/lib/mst/hooks';
import { ToolButton } from './tool-button';

export const Toolbar = observer(function Toolbar() {
	const { scene } = useStore();
	const tools = scene.tools.getTools.map((tool, i) => (
		<ToolButton key={`${tool.name}_${tool.id}_${i}`} mstId={tool.id} />
	));
	return <div className={styles.toolbar}>{tools}</div>;
});
