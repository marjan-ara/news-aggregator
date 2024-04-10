import { get } from './http';
import { CategoryRes, NewsFilter, NewsRes } from './the_guardian.types';

export async function categories(): Promise<CategoryRes> {
  return (await get<CategoryRes>('sections')).data;
}

export async function news(params: NewsFilter): Promise<NewsRes> {
  return (await get<NewsRes>('search', { params })).data;
}
