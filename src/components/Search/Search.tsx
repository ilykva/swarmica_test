import {FC} from 'react';

import {RadioBtn} from './children/RadioBtn';
import {SelectCategory} from './children/SelectCategory';
import {useSearch} from './hooks/useSearch';
import {Locales} from '../../interfaces';
import styles from './style.module.css';

const SEARCH_PLACEHOLDER = 'Начните вводить запрос...';

export const Search:FC = () => {
  const {
    search,
    locale,
    categoryOptions,
    category,
    handleSearch,
    handleLocaleChange,
    handleCategoryChange
  } = useSearch()

  return (
    <>
      <form className={styles.search}>
        <input
          value={search}
          className={styles.input}
          type="search"
          placeholder={SEARCH_PLACEHOLDER}
          onChange={handleSearch}
        />
        <div className={styles.filters}>
          <div className={styles.locales}>
            {Object.values(Locales).map(item => (
              <RadioBtn
                label={item}
                value={item}
                id={item}
                name='locale'
                onChange={handleLocaleChange}
                checked={locale === item}/>
            ))}
          </div>
          <SelectCategory options={categoryOptions} value={category} onChange={handleCategoryChange}/>
        </div>
      </form>
    </>

  )
}