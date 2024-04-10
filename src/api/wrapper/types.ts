export type NewsSource = 'News API' | 'New Yourk Times' | 'The Guardian';

export interface Filter {
  category?: Category[];
  sources?: NewsSource[];
  author?: string[];
  from?: Date;
  to?: Date;
}

export interface QueryFilter extends Filter {
  q?: string;
  pageNumber: number;
  pageSize: number;
}

export interface Article {
  source: NewsSource;
  author?: string;
  title: string;
  description: string;
  webUrl: string;
  imageUrl?: string;
  publishedAt: string;
  category: string;
}

export interface NewsRes {
  total: number;
  articles: Article[];
}

export interface Category {
  id: string;
  name: string;
  source: NewsSource;
}

export interface CategoryRes {
  items: Category[];
}
