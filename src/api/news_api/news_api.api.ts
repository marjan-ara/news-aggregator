import { SourceFilter, NewsFilter, SourceRes, NewsRes } from './news_api.types';
import { get } from './http';

export async function sources(params: SourceFilter): Promise<SourceRes> {
  return (await get<SourceRes>('top-headlines/sources/', { params })).data;
}

export async function news(params: NewsFilter): Promise<NewsRes> {
  return (await get<NewsRes>('everything', { params })).data;
}
