import styles from './page.module.sass';
import { Scene } from '@/features/scene';
import { AddMesh } from '@/features/addMesh';
import Image from 'next/image';
import ResizeIcon from '@public/resize.svg';

export default function PlatformPage() {
	return (
		<div className={styles.page}>
			<div className={styles.page__snippets}>
				<AddMesh />
			</div>
			<div className={styles.page__border}>
				<button>
					<Image src={ResizeIcon} alt="resize" />
				</button>
			</div>
			<Scene></Scene>
		</div>
	);
}
