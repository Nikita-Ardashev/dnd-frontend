'use client';

import styles from './dropdownForTiles.module.sass';
import Search from '../search';
import { observer } from 'mobx-react-lite';
import { Tile } from '@/components/ui/tile';

const arr: { img: string; link: string }[] = [
	{
		img: '/local_models/fantasy_walls_and_floors/textures/pillar_wood_baseColor.jpeg',
		link: '',
	},
];

export const DropdownForTiles = observer(function DropdownForTiles() {
	return (
		<div className={styles.dropdown}>
			<div className={styles.title}>
				<p className={styles.title__text}>Heading</p>
				<div className={styles.tools}>
					<button className={styles.tools__delete}></button>
					<button className={styles.tools__unwrap}></button>
				</div>
			</div>
			<div className="filters">
				<div className={styles.dropdown__search}>
					<Search />
				</div>
			</div>
			<div className={styles.dropdown__tiles}>
				{arr.map((a, i) => (
					<Tile {...a} key={i} />
				))}
			</div>
		</div>
	);
});
