import Image from 'next/image';
import React, { HTMLAttributes } from 'react';
import styles from './tile.module.sass';

interface ITile extends HTMLAttributes<HTMLAnchorElement> {
	img: string;
	link: string;
}

const Tile = ({ img, link, ...wrapperProps }: ITile) => {
	return (
		<a href={link} className={styles.tile} {...wrapperProps}>
			<Image src={img} alt={wrapperProps.title ?? ''} />
		</a>
	);
};

export default Tile;
