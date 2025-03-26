import {FC, SyntheticEvent, useState} from 'react';
import styles from './styles.module.css';

type SelectCategoryProps = {
  options: Value[];
  value?: Value;
  onChange: (e: SyntheticEvent) => void;
}

type Value = Record<string, string>;

export const SelectCategory:FC<SelectCategoryProps> = ({ options, onChange, value }) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen(prev => !prev);

  return (
    <div className={styles.select} onClick={toggleOpen}>
      <div className={styles.value}>{value?.label || <span className={styles.placeholder}>Выберите категорию...</span>}</div>
      {open && (
        <ul className={styles.selectMenu} onClick={onChange}>
          {options?.map(item => (
            <li data-id={item.value}>{item.label}</li>
          ))}
        </ul>
      )}
    </div>
  );
}