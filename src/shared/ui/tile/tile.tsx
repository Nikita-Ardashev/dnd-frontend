import Image from 'next/image';
import { HTMLAttributes } from 'react';
import styles from './tile.module.sass';
import { cn } from '@/shared/lib/styles/utils';

interface ITile extends HTMLAttributes<HTMLDivElement> {
	img: string;
}

export const Tile = ({ img, ...wrapperProps }: ITile) => {
	return (
		<div {...wrapperProps} className={cn(styles.root, wrapperProps.className)}>
			<Image src={img} alt={wrapperProps.title ?? ''} width={72} height={72} />
		</div>
	);
};
