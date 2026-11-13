import { Check } from 'lucide-react';

import { Checkbox, CheckboxIndicator } from '@/shared/ui/checkbox';
import { HiddenSidebar } from '@/shared/ui/hidden-sidebar';

import { ILayer, MOCK_LAYERS } from '../model/mock-layers';

import styles from './layers.module.sass';

const renderLayers = (layers: ILayer[], level: number = 0) => {
	return layers.map((layer) => (
		<div key={layer.name} className={styles.layer} style={{ marginLeft: level * 26 }}>
			<div className={styles['layer-header']}>
				<Checkbox>
					<CheckboxIndicator>
						<Check />
					</CheckboxIndicator>
				</Checkbox>
				<span>{layer.name}</span>
			</div>
			{layer.layersChildren.length > 0 && (
				<div className={styles['layer-children']}>
					{renderLayers(layer.layersChildren, level + 1)}
				</div>
			)}
		</div>
	));
};

export function Layers() {
	return (
		<HiddenSidebar
			maxWidth="256px"
			orientation={'right'}
			positionButton="start"
			title="Слои"
		>
			<div className={styles.root}>{renderLayers(MOCK_LAYERS)}</div>
		</HiddenSidebar>
	);
}
