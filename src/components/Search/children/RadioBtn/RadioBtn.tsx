import {ChangeEvent, FC} from 'react';
import styles from './styles.module.css';

type RadioBtnProps = {
  label: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
} & Partial<HTMLInputElement>;

export const RadioBtn:FC<RadioBtnProps> = ({ label, id, value, name, onChange, checked }) => {
  return (
    <label className={`${styles.radioBtn} ${checked ? styles.active : null}`} htmlFor={id}>
      {label}
      <input type='radio' value={value} id={id} name={name} onChange={onChange}/>
    </label>
  )
}