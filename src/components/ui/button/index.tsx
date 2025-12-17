import { ButtonHTMLAttributes } from 'react';
import styles from './button.module.sass';
type IButton = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = (props: IButton) => {
	return (
		<button {...props} className={`${styles.button} ${props.className ?? ''}`}></button>
	);
};
