import { StoreCameraControls } from '@/stores/storeCameraControls/cameraControls.store';
import { CameraControls } from '@react-three/drei';
import { observer } from 'mobx-react-lite';

interface IProps {
	enabled?: boolean;
}

export const Camera = observer(function Camera({ enabled }: IProps) {
	const camera = StoreCameraControls.get;

	return <CameraControls {...camera} enabled={enabled} />;
});
