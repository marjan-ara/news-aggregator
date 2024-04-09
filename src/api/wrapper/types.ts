export type NewsSource = 'News API' | 'New Yourk Times' | 'The Guardian';

export interface NewsFilter {
  q?: string;
  pageNumber: number;
  pageSize: number;
  from?: Date;
  to?: Date;
  category?: string[];
  sources: NewsSource[];
  author?: string[];
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
