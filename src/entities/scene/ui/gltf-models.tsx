import { useStoreScene } from '@/shared/lib/mst/hooks';
import { observer } from 'mobx-react-lite';
import { GLTFModel } from './gltf-model';

export const GltfModels = observer(function GltfModels() {
	const {
		construct: { getModelsArray: models },
	} = useStoreScene();

	const modelsRender = models.map((m) => <GLTFModel key={m.id} MSTId={m.id} />);

	return modelsRender;
});
