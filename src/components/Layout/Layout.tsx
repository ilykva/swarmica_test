import {FC, ReactNode} from 'react';
import styles from './style.module.css';

type LayoutProps = {
  children: ReactNode;
}

export const Layout:FC<LayoutProps> = ({children}) => {
  return (
    <div className={styles.layout}>
      {children}
    </div>
  )
}