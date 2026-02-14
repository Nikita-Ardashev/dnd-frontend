'use client';

import { Canvas } from '@react-three/fiber';
import { GizmoHelper, GizmoViewport } from '@react-three/drei';
import { GLTFModel } from './gltf-model';
import { observer } from 'mobx-react-lite';
import { useStoreScene } from '@/shared/lib/mst/hooks';
import { BuildedCubes } from './builded-cubes';
import { InteractiveGrid } from './interactive-grid';
import { Camera } from './camera';

export const SceneCanvas = observer(function Scene() {
	const scene = useStoreScene();
	const meshes = scene.construct.meshes;
	const isViewGrid = scene.isViewGrid;
	const isSelectedMesh = scene.selectedMeshIds.length > 0;

	const meshesRender = meshes.map((m) => <GLTFModel key={m.id} MSTId={m.id} />);

	return (
		<Canvas style={{ width: '100%', height: '100%' }}>
			{meshesRender}
			<BuildedCubes />
			{isViewGrid && <InteractiveGrid />}
			<>
				<Camera enabled={!isSelectedMesh} />
				<GizmoHelper alignment="bottom-right" margin={[100, 100]}>
					<GizmoViewport labelColor="white" axisHeadScale={1} disabled />
				</GizmoHelper>
				<ambientLight intensity={0.5} />
				<directionalLight position={[5, 10, 7.5]} intensity={1} castShadow />
			</>
		</Canvas>
	);
});
