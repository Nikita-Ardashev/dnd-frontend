/* eslint-disable jsx-a11y/alt-text */
'use client';

import Image from 'next/image';
import { ButtonHTMLAttributes, ComponentProps } from 'react';
import styles from './toolButton.module.sass';
import { observer } from 'mobx-react-lite';

interface ToolButton extends ButtonHTMLAttributes<HTMLButtonElement> {
	imageProps: ComponentProps<typeof Image>;
	isCurrent: boolean;
}

export const ToolButton = observer(function ToolButton({
	imageProps,
	isCurrent,
	...props
}: ToolButton) {
	return (
		<button
			{...props}
			className={`${styles.tool} ${isCurrent ? styles.tool__current : ''}`}
		>
			<Image {...imageProps} width={32} height={32} />
		</button>
	);
});
