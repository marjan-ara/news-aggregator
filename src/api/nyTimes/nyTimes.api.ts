import { get } from './http';
import { NewsFilter, NewsRes } from './nyTimes.types';

export async function news(params: NewsFilter) {
  return (await get<NewsRes>('articlesearch.json', { params })).data;
}
