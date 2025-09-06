import { ThreeElements } from '@react-three/fiber';
import React, { memo } from 'react';
import { Euler } from 'three';
import { CustomGridCell } from './customGridCell';
import { StoreScene } from '@/stores/scene/scene.store';
import { observer } from 'mobx-react-lite';
type TGroupProps = Omit<ThreeElements['group'], 'children'>;
interface ICustomProps extends TGroupProps {
	isViewGrid?: boolean;
}

export const CustomGrid = memo(
	observer(function CustomGrid({ isViewGrid = true, ...groupProps }: ICustomProps) {
		const lines = StoreScene.grid.cells.map((cell, i) => (
			<CustomGridCell key={i} position={cell.position.getArray} cellId={cell.id} />
		));
		return (
			<group position={[1, 1, 1]} rotation={new Euler(0, 0, 0)} {...groupProps}>
				{isViewGrid && lines}
			</group>
		);
	}),
);
