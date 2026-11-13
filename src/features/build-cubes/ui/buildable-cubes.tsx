import { ThreeElements } from '@react-three/fiber';
import { observer } from 'mobx-react-lite';
import { Euler } from 'three';

import { useStoreScene } from '@/entities/scene';

import { BuildableCube } from './buildable-cube';

type TGroupProps = Omit<ThreeElements['group'], 'children'>;

export const BuildableCubes = observer(function BuildableCubes({
	...groupProps
}: TGroupProps) {
	const scene = useStoreScene();

	const cubes = scene.construct.getCubesArray.map((cube) => (
		<BuildableCube key={cube.id} cubeId={cube.id} />
	));
	return (
		<group rotation={new Euler(0, 0, 0)} {...groupProps}>
			{cubes}
		</group>
	);
});
