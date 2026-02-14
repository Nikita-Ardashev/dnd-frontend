import { useStoreScene } from '@/shared/lib/mst/hooks';
import { CameraControls } from '@react-three/drei';
import { observer } from 'mobx-react-lite';

interface IProps {
	enabled?: boolean;
}

export const Camera = observer(function Camera({ enabled }: IProps) {
	const { camera } = useStoreScene();

	return <CameraControls {...camera} enabled={enabled} />;
});
