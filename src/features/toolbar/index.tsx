import styles from './toolbar.module.sass';
import { ToolButton } from './components/toolButton';
import { observer } from 'mobx-react-lite';
import { StoreSceneTools } from '@/stores/storeSceneTools/storeSceneTools.store';

export const Toolbar = observer(function Toolbar() {
	const tools = StoreSceneTools.getTools.map((tool, i) => (
		<ToolButton key={`${tool.name}_${tool.id}_${i}`} {...tool} />
	));
	return <div className={styles.toolbar}>{tools}</div>;
});
