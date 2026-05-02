import { useStoreScene } from '@/shared/lib/mst';
import { CameraControls } from '@react-three/drei';
import { observer } from 'mobx-react-lite';
import { ComponentProps } from 'react';

export const Camera = observer(function Camera() {
	const { camera } = useStoreScene();

	return (
		<CameraControls
			{...camera}
			onRest={(e) => {
				if (!e) return;
				const event = e as typeof e & {
					target: ComponentProps<typeof CameraControls>;
				};
				const target = event.target;
				camera.setRealTimeDistance(target.distance ?? 10);
			}}
		/>
	);
});
