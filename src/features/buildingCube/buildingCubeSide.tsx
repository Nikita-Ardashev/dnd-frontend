import { IReturnCubePosition, TSideClick } from '@/utils/getCubePositionBasedSide';
import { ThreeElements } from '@react-three/fiber';
import { DoubleSide, MeshStandardMaterial, PlaneGeometry } from 'three';

interface IProps {
	mesh?: ThreeElements['mesh'];
	planePosition: IReturnCubePosition;
}

const geometry = new PlaneGeometry(0.9, 0.9);
const material = new MeshStandardMaterial({
	color: 'white',
	opacity: 0.1,
	transparent: true,
	side: DoubleSide,
});

const SIDE_CONFIG: Record<
	TSideClick,
	{
		rotation: [x: number, y: number, z: number];
		offset: [x: number, y: number, z: number];
	}
> = {
	top: { rotation: [-Math.PI / 2, 0, 0], offset: [0, -0.499, 0] },
	bottom: { rotation: [Math.PI / 2, 0, 0], offset: [0, 0.499, 0] },
	right: { rotation: [0, Math.PI / 2, 0], offset: [-0.499, 0, 0] },
	left: { rotation: [0, -Math.PI / 2, 0], offset: [0.499, 0, 0] },
	front: { rotation: [0, 0, 0], offset: [0, 0, -0.499] },
	back: { rotation: [0, 0, 0], offset: [0, 0, 0.499] },
	unknown: { rotation: [0, 0, 0], offset: [0, 0, 0] },
};

export const BuildingCubeSide = ({ mesh, planePosition }: IProps) => {
	const { side, position: cubePosition } = planePosition;
	const { offset, rotation } = SIDE_CONFIG[side];

	const finalPosition: [x: number, y: number, z: number] = [
		cubePosition.x + offset[0],
		cubePosition.y + offset[1],
		cubePosition.z + offset[2],
	];

	return (
		<mesh
			{...mesh}
			position={finalPosition}
			geometry={geometry}
			material={material}
			rotation={rotation}
		/>
	);
};
