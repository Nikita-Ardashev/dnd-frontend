interface IHandler {
	e: KeyboardEvent;
	key: string;
	isWithShift?: boolean;
	handler: () => void;
}

export const handlerCTRL = (props: IHandler) => {
	const isShiftPress = props.isWithShift ? props.e.shiftKey : !props.e.shiftKey;
	if (
		props.e.key.toLowerCase() === props.key.toLowerCase() &&
		props.e.ctrlKey &&
		isShiftPress
	) {
		props.handler();
	}
};
