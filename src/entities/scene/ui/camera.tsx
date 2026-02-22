import { useStoreScene } from '@/shared/lib/mst/hooks';
import { CameraControls } from '@react-three/drei';
import { observer } from 'mobx-react-lite';

export const Camera = observer(function Camera() {
	const { camera, selectedMeshIds } = useStoreScene();
	const isSelectedMesh = selectedMeshIds.length > 0;

	return <CameraControls {...camera} enabled={!isSelectedMesh} />;
});
