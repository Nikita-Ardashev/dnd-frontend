import { ThreeElements } from '@react-three/fiber';
import { Euler } from 'three';
import { BuildingCube } from './buildingCube';
import { StoreScene } from '@/stores/storeScene/scene.store';
import { observer } from 'mobx-react-lite';

type TGroupProps = Omit<ThreeElements['group'], 'children'>;
interface ICustomProps extends TGroupProps {
	isViewGrid?: boolean;
}

export const BuildedCubes = observer(function CustomGrid({
	isViewGrid = true,
	...groupProps
}: ICustomProps) {
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
			{isViewGrid && cubes}
		</group>
	);
});
