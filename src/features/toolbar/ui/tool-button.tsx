'use client';

import Image from 'next/image';
import styles from './tool-button.module.sass';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/shared/lib/mst/hooks';

interface IProps {
	mstId: string;
}

export const ToolButton = observer(function ToolButton({ mstId }: IProps) {
	const { scene } = useStore();
	const tool = scene.tools.getToolsById(mstId)!;

	const { setCurrent, currentId } = scene.tools;
	const isCurrent = currentId === mstId;

	const tools = tool.children.map((t, i) => (
		<ToolButton mstId={t.id} key={`${t.name}_${t.id}_${i}`} />
	));

	const isChildrenToolActive = tool.children.some((child) => child.id === currentId);
	return (
		<div className={styles.tools}>
			<button
				title={tool.name}
				className={`${styles.tool} ${isCurrent ? styles.tool__current : ''}`}
				onClick={() => {
					setCurrent(tool.id);
				}}
			>
				<Image src={tool.iconURL} alt={tool.name} width={32} height={32} priority />
			</button>
			{tools.length > 0 && (
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
