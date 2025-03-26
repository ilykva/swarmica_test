import {useEffect, useState} from 'react';
import {useDataProvider} from '../../../DataProvider';

const STORAGE_KEY = 'read_articles';

export const useArticles = () => {
  const {articles, isArticlesLoading} = useDataProvider();
  const [readArticles, setReadArticles] = useState<string[]>(() => {
    try {
      const readIds = localStorage.getItem(STORAGE_KEY);

      if (!readIds) return [];

      return JSON.parse(readIds);
    } catch (error) {
      console.error('error while reading from localStorage', error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(readArticles));
  }, [readArticles]);

  const onArticleClick = (id: string) => {
    setReadArticles((prevArticles) => [...prevArticles, id]);
  }

  return {
    readArticles,
    articles,
    isArticlesLoading,
    onArticleClick,
  }
}