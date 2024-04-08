export interface NewsFilter {
  q?: string;
  section?: string; //sample `(A,B)|(C,D)|-D`
  tag?: string; // sample `(A,B)|(C,D)|-D`
  'from-date'?: string; // date in  ISO 8601 format
  'to-date'?: string; // date in  ISO 8601 format
  page?: number;
  'page-size'?: number;
}

interface Element {
  id: string;
  relation: string;
  type: string;
  assets: {
    type: string; // "image",
    mimeType: string; // "image/jpeg",
    file: string; // "https://media.guim.co.uk/a240d62e0ab8da71493d12b7c0fb6d3e8fa5f512/368_338_1783_1070/1000.jpg",
  }[];
}

export interface Article {
  id: string;
  sectionId: string;
  sectionName: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  elements: Element[];
}
export interface NewsRes {
  response: {
    status: string;
    total: number;
    pageSize: number;
    currentPage: number;
    pages: number;
    orderBy: string;
    results: Article[];
  };
}

export interface Tag {
  id: string;
  type: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  sectionId: string;
  sectionName: string;
}

export interface TagRes {
  status: string;
  userTier: string;
  total: number;
  startIndex: number;
  pageSize: number;
  currentPage: number;
  pages: number;
  results: Tag[];
}
