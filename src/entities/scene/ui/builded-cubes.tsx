import { ThreeElements } from '@react-three/fiber';
import { Euler } from 'three';
import { observer } from 'mobx-react-lite';
import { useStoreScene } from '@/shared/lib/mst/hooks';
import { BuildingCube } from './building-cube';

type TGroupProps = Omit<ThreeElements['group'], 'children'>;

export const BuildedCubes = observer(function CustomGrid({ ...groupProps }: TGroupProps) {
	const scene = useStoreScene();

	const cubes = scene.construct.getCubesArray.map((cube, i) => (
		<BuildingCube key={i} cubeId={cube.id} />
	));
	return (
		<group rotation={new Euler(0, 0, 0)} {...groupProps}>
			{cubes}
		</group>
	);
});
