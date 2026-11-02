import { handlerKeys } from '@/shared/lib/keyboard';
import { withHistory } from '@/shared/lib/mst';
import { RootStore } from './root-store';

// Объявляем добавления стора в историю
const StoreSceneHistory = withHistory(RootStore.scene.construct, [
	'/sizes/min',
	'/sizes/max',
]);

export const handlerChangeHistory = (e: KeyboardEvent) => {
	handlerKeys({
		e,
		key: 'KeyZ',
		isWithCtrl: true,
		handler: () => {
			StoreSceneHistory.undo();
		},
	});
	handlerKeys({
		e,
		key: 'KeyZ',
		isWithShift: true,
		isWithCtrl: true,
		handler: () => {
			StoreSceneHistory.redo();
		},
	});
};
