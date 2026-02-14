import { ThreeElements } from '@react-three/fiber';
import { Euler } from 'three';
import { observer } from 'mobx-react-lite';
import { useStoreScene } from '@/shared/lib/mst/hooks';
import { BuildingCube } from './building-cube';

type TGroupProps = Omit<ThreeElements['group'], 'children'>;

export const BuildedCubes = observer(function CustomGrid({ ...groupProps }: TGroupProps) {
	const scene = useStoreScene();

	const cubes = scene.construct.sceneCubes.cubes.map((cube, i) => (
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
