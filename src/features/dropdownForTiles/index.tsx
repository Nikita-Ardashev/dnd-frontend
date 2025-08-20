import React from 'react';
import styles from './dropdownForTiles.module.sass';
import Search from '../search';
const DropdownForTiles = () => {
	return (
		<div className={styles.dropdown}>
			<div className={styles.dropdown__title}>
				<p className={styles.dropdown__title__text}>Heading</p>
				<div className={styles.dropdown__tools}>
					<button className={styles.dropdown__tools__delete}></button>
					<button className={styles.dropdown__tools__unwrap}></button>
				</div>
			</div>
			<div className={styles.dropdown__search}>
				<Search />
			</div>
			<div className={styles.dropdown__tiles}></div>
		</div>
	);
};

export default DropdownForTiles;
