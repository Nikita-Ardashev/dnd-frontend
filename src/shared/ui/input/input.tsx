import { InputHTMLAttributes } from 'react';
import styles from './input.module.sass';
type IInput = InputHTMLAttributes<HTMLInputElement>;

export const Input = (props: IInput) => {
	return <input {...props} className={`${styles.input} ${props.className ?? ''}`} />;
};
