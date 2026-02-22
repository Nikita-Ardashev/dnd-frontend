import styles from './toolbar.module.sass';
import { observer } from 'mobx-react-lite';
import { useStoreScene } from '@/shared/lib/mst/hooks';
import { ToolButton } from './tool-button';

export const Toolbar = observer(function Toolbar() {
	const { tools, isEditable } = useStoreScene();
	const toolsRender = tools.getTools.map(
		(tool, i) =>
			(tool.isAvailableUse || isEditable) && (
				<ToolButton key={`${tool.name}_${tool.id}_${i}`} mstId={tool.id} />
			),
	);
	return <div className={styles.toolbar}>{toolsRender}</div>;
});
