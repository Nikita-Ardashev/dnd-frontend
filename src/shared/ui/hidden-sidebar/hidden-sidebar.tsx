'use client';
import { cn } from '@/shared/lib/styles';
import { CSSProperties, ReactNode, useState } from 'react';
import styles from './hidden-sidebar.module.sass';
import { SquareArrowRightEnterIcon } from 'lucide-react';
import { Button } from '../button';

type TOrientation = 'left' | 'right';
type TPositionButton = 'start' | 'end' | 'center';

interface IProps {
	isViewDefault?: true;
	onChange?: () => void;
	children: ReactNode;
	orientation: TOrientation;
	positionButton: TPositionButton;
	maxWidth: string;
	title: string;
}

const calculateOrientation = (
	orientation: TOrientation,
	positionButton: TPositionButton,
	maxWidth: string,
) => {
	const styleRoot: CSSProperties = {};
	const styleButton: CSSProperties = calculatedPositionButton(positionButton);

	switch (orientation) {
		case 'left':
			styleButton.right = 4;
			styleRoot.marginLeft = `-${maxWidth}`;
			break;
		case 'right':
			styleButton.left = 4;
			styleRoot.marginRight = `-${maxWidth}`;
			break;
	}

	return { styleRoot, styleButton };
};

const calculatedPositionButton = (positionButton: TPositionButton) => {
	const styleButton: CSSProperties = {};
	switch (positionButton) {
		case 'center':
			styleButton.top = '50%';
			styleButton.transform = 'translateY(-50%)';
			break;
		case 'start':
			styleButton.top = '4px';
			break;
		case 'end':
			styleButton.bottom = '4px';
			break;
	}

	return styleButton;
};

export const HiddenSidebar = ({ isViewDefault = true, ...props }: IProps) => {
	const [isView, setIsView] = useState<boolean>(isViewDefault);
	const { styleRoot, styleButton } = calculateOrientation(
		props.orientation,
		props.positionButton,
		props.maxWidth,
	);

	return (
		<div
			className={cn(styles.root, 'transition-margin-left duration-300')}
			style={{
				marginLeft: isView ? '0' : `${styleRoot.marginLeft}`,
				marginRight: isView ? '0' : `${styleRoot.marginRight}`,
				maxWidth: props.maxWidth,
			}}
		>
			<div className={styles.heading}>
				<h1
					className={styles.title}
					style={{ paddingLeft: props.orientation === 'right' ? '28px' : 0 }}
				>
					{props.title}
				</h1>
				<div
					className={cn(
						styles['button-wrapper'],
						styles[`button-wrapper--${props.orientation}`],
						!isView && styles['button-wrapper--close'],
					)}
					style={styleButton}
				>
					<Button
						variant={isView ? 'ghost' : 'outline'}
						size={'icon'}
						className={styles.button}
						onClick={() => {
							setIsView((v) => !v);
							if (props.onChange) props.onChange();
						}}
					>
						<SquareArrowRightEnterIcon
							width={16}
							height={16}
							className={styles.button__icon}
						/>
					</Button>
				</div>
			</div>
			{props.children}
		</div>
	);
};
