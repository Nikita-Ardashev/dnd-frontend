interface IProps {
	e: KeyboardEvent;
	key: string | string[];
	handler: () => void;
	isWithShift?: boolean;
	isWithCtrl?: boolean;
	isWithAlt?: boolean;
}

export const handlerKeys = (props: IProps) => {
	const isWithShift = props.isWithShift ? props.e.shiftKey : !props.e.shiftKey;
	const isWithCtrl = props.isWithCtrl ? props.e.ctrlKey : !props.e.ctrlKey;
	const isWithAlt = props.isWithCtrl ? props.e.ctrlKey : !props.e.ctrlKey;

	const key = props.e.key.toLowerCase();
	const code = props.e.code.toLowerCase();

	const isKeyInArray =
		Array.isArray(props.key) &&
		Boolean(props.key.find((k) => k.toLowerCase() === key || k.toLowerCase() === code));

	const isCurrentKey =
		isKeyInArray ||
		(!Array.isArray(props.key) && key === props.key.toLowerCase()) ||
		(!Array.isArray(props.key) && code === props.key.toLowerCase());
	if (isCurrentKey && isWithCtrl && isWithShift && isWithAlt) {
		props.handler();
	}
};
