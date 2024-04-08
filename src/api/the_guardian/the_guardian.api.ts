import { get } from './http';
import { NewsFilter, NewsRes, TagRes } from './the_guardian.types';

export async function tags(): Promise<TagRes> {
  return (await get<TagRes>('tags')).data;
}

export async function news(params: NewsFilter): Promise<NewsRes> {
  return (await get<NewsRes>('search', { params })).data;
}
