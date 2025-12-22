import Image from 'next/image';
import { HTMLAttributes, MouseEvent } from 'react';
import styles from './tile.module.sass';

interface ITile extends HTMLAttributes<HTMLAnchorElement> {
	img: string;
	link: string;
}

const handlerDrag = (e: MouseEvent) => {
	console.log(e);
};

export const Tile = ({ img, link, ...wrapperProps }: ITile) => {
	return (
		<a href={link} className={styles.tile} onDragStart={handlerDrag} {...wrapperProps}>
			<Image src={img} alt={wrapperProps.title ?? ''} width={90} height={90} />
		</a>
	);
};
