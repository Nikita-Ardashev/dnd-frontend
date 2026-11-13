import { GizmoHelper, GizmoViewport } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import { Camera } from '@/entities/scene';
import { BuildableCubes, BuildGrid } from '@/features/build-cubes';

import { SceneModels } from './scene-models';

interface IProps {
	width?: string;
	height?: string;
}

export const SceneCanvas = ({ width, height }: IProps) => {
	return (
		<Canvas style={{ width: width ?? '100%', height: height ?? '100%' }}>
			<SceneModels />
			<BuildableCubes />
			<BuildGrid />
			<Camera />
			<GizmoHelper alignment="bottom-right" margin={[100, 100]}>
				<GizmoViewport labelColor="white" axisHeadScale={1} disabled />
			</GizmoHelper>
			<ambientLight intensity={0.5} />
			<directionalLight position={[5, 10, 7.5]} intensity={1} castShadow />
		</Canvas>
	);
};
