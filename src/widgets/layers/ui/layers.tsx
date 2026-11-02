import { Checkbox, CheckboxIndicator } from '@/shared/ui/checkbox';
import styles from './layers.module.sass';
import { Check } from 'lucide-react';
import HiddenSidebar from '@/shared/ui/hidden-sidebar/hidden-sidebar';

interface ILayersProps {
	name: string;
	isActive: boolean;
	layersChildren: ILayersProps[];
}

const DEFAULT_LAYERS: ILayersProps[] = [
	{
		name: 'Layer 1',
		isActive: true,
		layersChildren: [
			{
				name: 'Sub Layer 1',
				isActive: true,
				layersChildren: [],
			},
			{
				name: 'Sub Layer 2',
				isActive: false,
				layersChildren: [],
			},
		],
	},
	{
		name: 'Layer 2',
		isActive: false,
		layersChildren: [],
	},
];

const renderLayers = (layers: ILayersProps[], level: number = 0) => {
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
	// const [layers, setLayers] = useState<ILayersProps[]>(DEFAULT_LAYERS);

	return (
		<HiddenSidebar
			maxWidth="256px"
			orientation={'right'}
			positionButton="start"
			title="Слои"
		>
			<div className={styles.root}>{renderLayers(DEFAULT_LAYERS)}</div>
		</HiddenSidebar>
	);
}
