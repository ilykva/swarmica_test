export enum Statuses {
    PUBLISHED = 'PUBLISHED',
    APPROVED = 'APPROVED',
    ARCHIVED = 'ARCHIVED',
    DRAFT = 'DRAFT',
    UNAPPROVED = 'UNAPPROVED',
}

export enum Locales {
    EN = 'en',
    RU = 'ru'
}

export type Article = {
    id: string;
    ext_id: string;
    rank: number,
    status: Statuses,
    highlight: Record<string, string>;
    public_urls: Record<string, string>;
    created_at: string;
    updated_at: string,
    published_at: string,
    author: string,
    title: Record<string, string>;
}

type fetchArticlesParams = {
    search: string;
    category?: string[];
    locale?: Locales;
}

export interface IDataStore {
    articles: Article[];
    locales: Locales[];
    isArticlesLoading: boolean;
    categories: Category[];
    fetchLocales: () => void;
    fetchCategories: () => void;
    fetchArticles: (params: fetchArticlesParams) => void;
}

export type Category = {
    id: string;
    name: Record<Locales, string>;
    image_path: string;
    public: boolean;
}

export interface IDataContext {
    isArticlesLoading: boolean;
    categories: Category[];
    locales: Locales[];
    fetchArticles: (params: fetchArticlesParams) => void;
    articles: Article[];
}