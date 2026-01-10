'use client';

import Image from 'next/image';
import styles from './toolButton.module.sass';
import { observer } from 'mobx-react-lite';
import { IModelTool } from '@/stores/storeSceneTools/types';
import { StoreSceneTools } from '@/stores/storeSceneTools/storeSceneTools.store';

export const ToolButton = observer(function ToolButton(props: IModelTool) {
	const { setCurrent, currentId } = StoreSceneTools;
	const isCurrent = currentId === props.id;

	const tools = props.children.map((tool, i) => (
		<ToolButton key={`${tool.name}_${tool.id}_${i}`} {...tool} />
	));
	const isChildrenToolActive = props.children.some((child) => child.id === currentId);
	return (
		<div className={styles.tools}>
			<button
				title={props.name}
				className={`${styles.tool} ${isCurrent ? styles.tool__current : ''}`}
				onClick={() => {
					setCurrent(props.id);
				}}
			>
				<Image src={props.iconURL} alt={props.name} width={32} height={32} />
			</button>
			{props.children.length > 0 && (
				<div
					className={`${styles.tools__children} ${
						isChildrenToolActive ? styles['tools__children-active'] : ''
					}`}
				>
					{tools}
				</div>
			)}
		</div>
	);
});
