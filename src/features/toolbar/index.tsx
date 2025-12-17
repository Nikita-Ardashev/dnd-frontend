import styles from './toolbar.module.sass';
import { ToolButton } from './components/toolButton';
import { observer } from 'mobx-react-lite';
import { StoreSceneTools } from '@/stores/storeSceneTools/storeSceneTools.store';

export const Toolbar = observer(function Toolbar() {
	const tools = StoreSceneTools.getTools.map((tool, index) => (
		<ToolButton
			key={tool.name + index}
			title={tool.name}
			imageProps={{ src: tool.iconURL ?? '', alt: tool.name }}
			isCurrent={StoreSceneTools.current === tool.name}
			onClick={() => {
				StoreSceneTools.setCurrent(tool.name);
			}}
		/>
	));
	return <div className={styles.toolbar}>{tools}</div>;
});
