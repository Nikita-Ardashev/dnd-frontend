import {
	Drawer,
	DrawerBackdrop,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerHandle,
	DrawerPopup,
	DrawerPortal,
	DrawerTitle,
	DrawerTrigger,
	DrawerViewport,
} from '@/shared/ui/drawer';
import styles from './notes.module.sass';
import { Button } from '@/shared/ui/button';

export function Notes() {
	return (
		<Drawer>
			<DrawerTrigger
				render={<Button className={styles['drawer-trigger']}>Заметки</Button>}
			/>
			<DrawerPortal>
				<DrawerBackdrop />
				<DrawerViewport>
					<DrawerPopup className={styles.popup}>
						<DrawerHandle />
						<DrawerContent>
							<DrawerTitle className={styles.title}>Заметки</DrawerTitle>
							<DrawerDescription className={styles.description}>
								You&apos;ve used 4.2 GB of 10 GB. Upgrade your plan for more
								space.
							</DrawerDescription>
							<div className={styles.actions}>
								<DrawerClose
									render={
										<Button size="sm" variant="outline">
											Done
										</Button>
									}
								/>
							</div>
						</DrawerContent>
					</DrawerPopup>
				</DrawerViewport>
			</DrawerPortal>
		</Drawer>
	);
}
