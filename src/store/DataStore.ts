import { create } from 'zustand';
import {IDataStore} from '../interfaces';

const URL_ARTICLES = '/api/search/articles';
const URL_SETTINGS = '/api/instance';
const URL_CATEGORIES = '/api/categories';

export const useDataStore = create<IDataStore>((set) => ({
   articles: [],
   isArticlesLoading: false,
   locales: [],
   categories: [],
   fetchArticles: async (params) => {
     set({ isArticlesLoading: true });
     try {
       const searchParams = new URLSearchParams();

       Object.entries(params).forEach(([key, value]) => {
         if (value !== undefined && value !== null) {
           searchParams.append(key, String(value));
         }
       });

       const response = await fetch(`${URL_ARTICLES}?${searchParams.toString()}`);
       const articles = await response.json();

       set({
         articles: articles.results,
       })
     } catch (error) {
       console.error('Could not fetch data from resource', error);
     } finally {
       set({ isArticlesLoading: false });
     }
   },
   fetchCategories: async () => {
     try {
       const response = await fetch(URL_CATEGORIES);
       const categories = await response.json();

       set({
         categories: categories.results,
       });
     } catch (error) {
       console.error('Could not fetch data from resource', error);
     }
   } ,
   fetchLocales: async () => {
     try {
       const response = await fetch(URL_SETTINGS);
       const settings = await response.json();

       set({
         locales: settings.locales,
       });
     } catch (error) {
       console.error('Could not fetch data from resource', error);
     }
   }
}))