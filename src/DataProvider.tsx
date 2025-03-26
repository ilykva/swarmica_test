import {FC, ReactNode, useEffect, createContext, useContext} from "react";
import {useDataStore} from './store/DataStore';
import {IDataContext} from './interfaces'

export const useDataProvider = () => {
  return useContext(DataContext);
}

export const DataContext = createContext<IDataContext>({} as IDataContext);

interface IDataProvider {
  children: ReactNode;
}

export const DataProvider: FC<IDataProvider> = ({ children }) => {
    const {fetchLocales, fetchCategories, categories, locales, fetchArticles, articles, isArticlesLoading} = useDataStore();

    useEffect(() => {
      fetchLocales();
      fetchCategories();
    }, []);

    return (
      <DataContext.Provider value={{
        categories,
        locales,
        fetchArticles,
        articles,
        isArticlesLoading
      }}>
        {children}
      </DataContext.Provider>
    );
}
