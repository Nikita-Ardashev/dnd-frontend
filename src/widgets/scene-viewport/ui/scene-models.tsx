import { observer } from 'mobx-react-lite';

import { GLTFModel } from '@/entities/mesh';
import { useStoreScene } from '@/entities/scene';
import { TransformControls } from '@/features/transform-mesh';

/** Модели сцены; в режиме редактирования каждая обёрнута в контролы трансформации. */
export const SceneModels = observer(function SceneModels() {
	const {
		construct: { getModelsArray: models },
		isEditable,
	} = useStoreScene();

	return models.map((model) =>
		isEditable ? (
			<TransformControls key={model.id} id={model.id}>
				<GLTFModel model={model} />
			</TransformControls>
		) : (
			<GLTFModel key={model.id} model={model} />
		),
	);
});
