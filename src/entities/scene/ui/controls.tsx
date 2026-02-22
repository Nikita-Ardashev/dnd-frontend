import { useStoreScene } from '@/shared/lib/mst/hooks';
import { DragControls, PivotControls, PivotControlsProps } from '@react-three/drei';
import { DragControlsProps } from '@react-three/drei/web/DragControls';
import { ThreeEvent } from '@react-three/fiber';
import { observer } from 'mobx-react-lite';
import { JSX, ReactNode, useLayoutEffect, useState } from 'react';
import { Matrix4 } from 'three';

type CommonByKeys<T, U> = Pick<T, Extract<keyof T, keyof U>>;

type TUnionConfig = Omit<
	CommonByKeys<DragControlsProps, PivotControlsProps>,
	'children' | 'onDragStart'
> & { onDragStart?: () => void };

interface IProps {
	children: JSX.Element;
	id: string;
}

export const Controls = observer(function Controls({ children, id }: IProps) {
	const { addSelectedByMesh, removeSelectedMesh, construct, tools, getIsSelectedMesh } =
		useStoreScene();
	const model = construct.getModel(id);

	if (model === undefined) {
		throw new Error(`Не удалось получить модель по id: ${id}`);
	}

	const { isDrag, isRotate, isScale, isAxes } = tools.getCurrent;
	const isActiveTool = isRotate || isScale || isAxes;
	const isFullTool = isActiveTool || isDrag;

	const isSelected = getIsSelectedMesh(id);

	const [matrix, setMatrix] = useState<number[]>([]);

	useLayoutEffect(() => {
		setMatrix(model.getMatrix4.toArray());
	}, [model.getMatrix4]);

	const selectedDisabled = () => {
		removeSelectedMesh(id);
	};

	const selectedEnabled = () => {
		if (!isFullTool) return;
		addSelectedByMesh(id);
	};

	const draggedEnabled = () => {
		if (!isFullTool) return;
		addSelectedByMesh(id);
	};

	const draggedDisabled = () => {
		if (matrix === undefined) return;
		const m = new Matrix4().fromArray(matrix);
		model.setMatrix4(m);
	};

	const handlerDrag = (localMatrix: Matrix4) => {
		setMatrix(localMatrix.toArray());
	};

	const basicConfig: TUnionConfig = {
		autoTransform: false,
		onDrag: handlerDrag,
		onDragStart: draggedEnabled,
		matrix: new Matrix4().fromArray(matrix),
	};

	const dragConfig: Partial<Omit<DragControlsProps, 'children'>> = {
		...basicConfig,
		dragConfig: { threshold: 5 },
		onDragEnd: () => {
			draggedDisabled();
			selectedDisabled();
		},
	};

	const pivotConfig: Partial<Omit<PivotControlsProps, 'children'>> = {
		...basicConfig,
		enabled: isSelected && isActiveTool,
		disableAxes: !isAxes,
		disableRotations: !isRotate,
		disableScaling: !isScale,
		disableSliders: true,
		offset: model.getSizeMin.map((v) => v - 10) as [number, number, number],
		onDragEnd: draggedDisabled,
		depthTest: false,
	};

	const controls = isDrag
		? withDrag(children, dragConfig)
		: withPivot(children, pivotConfig);

	return (
		<group
			onPointerDown={(e: ThreeEvent<PointerEvent>) => {
				if (
					e.intersections.length > 0 &&
					e.intersections[0].object.uuid !== e.object.uuid
				) {
					return;
				}
				selectedEnabled();
			}}
			onPointerMissed={() => {
				selectedDisabled();
			}}
		>
			{controls}
		</group>
	);
});

const withDrag = (
	children: ReactNode,
	config?: Partial<Omit<DragControlsProps, 'children'>>,
) => <DragControls {...config}>{children}</DragControls>;

const withPivot = (
	children: ReactNode,
	config?: Partial<Omit<PivotControlsProps, 'children'>>,
) => <PivotControls {...config}>{children}</PivotControls>;
