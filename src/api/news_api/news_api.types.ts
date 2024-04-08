export type Category = 'business' | 'entertainment' | 'general' | 'health' | 'science' | 'sports' | 'technology';

export interface SourceFilter {
  category?: Category;
}

export interface Source {
  id: string;
  name: string;
  description: string;
  url: string;
  category: Category;
  language: string;
  country: string;
}

export interface SourceRes {
  status: string;
  sources: Source[];
}

export interface NewsFilter {
  pageSize: number;
  page: number;
  q?: string;
  sources: string; //comma seperated string of source ids
  // category?: Category;
  from?: string; // date in  ISO 8601 format
  to?: string; // date in ISO 8601 format
}

export interface Article {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface NewsRes {
  status: string;
  totalResults: number;
  articles: Article[];
}
