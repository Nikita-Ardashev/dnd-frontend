import { ThreeElements } from '@react-three/fiber';
import { Euler } from 'three';
import { BuildingCube } from './buildingCube';
import { StoreScene } from '@/stores/storeScene/scene.store';
import { observer } from 'mobx-react-lite';

type TGroupProps = Omit<ThreeElements['group'], 'children'>;

export const BuildedCubes = observer(function CustomGrid({ ...groupProps }: TGroupProps) {
	const cubes = StoreScene.sceneCubes.cubes.map((cube, i) => (
		<BuildingCube
			key={i}
			position={cube.position.getArray}
			cubeId={cube.id}
			textureUrls={cube.textureUrls}
		/>
	));
	return (
		<group rotation={new Euler(0, 0, 0)} {...groupProps}>
			{cubes}
		</group>
	);
});
