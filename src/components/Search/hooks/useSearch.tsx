import {ChangeEvent, SyntheticEvent, useCallback, useEffect, useMemo, useState} from 'react';
import {useDataProvider} from '../../../DataProvider';
import {Locales} from '../../../interfaces';
import {useDebounce} from '../../../hooks/useDebounce';

export const useSearch = () => {
  const {fetchArticles, categories} = useDataProvider();
  const [search, setSearch] = useState<string>('');
  const [locale, setLocale] = useState<Locales>(Locales.RU);
  const [category, setCategory] = useState<Record<string, string>>();

  const debounceSearch = useDebounce(search, 500);

  useEffect(() => {
    if (debounceSearch.length >= 3) {
      fetchArticles?.({
        search,
        locale,
        category: category ? [category?.value] : []
      });
    }
  }, [debounceSearch, category, locale]);

  const categoryOptions = useMemo(() => {
    if (!categories?.length) {
      return [];
    }
    return categories.map(item => ({
      label: item?.name?.[locale],
      value: item?.id,
    }));
  }, [categories, locale]);

  const handleLocaleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target;

    setLocale(value as Locales);
  }

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target;
    setSearch(value);
  }

  const handleCategoryChange = useCallback((e: SyntheticEvent) => {
    const target = e.target as HTMLUListElement;
    const id = target.dataset.id
    const option = categoryOptions.find(item => item.value == id);

    setCategory(option);
  }, [categoryOptions]);

  return {
    search,
    locale,
    categoryOptions,
    category,
    handleSearch,
    handleCategoryChange,
    handleLocaleChange,
  }
}