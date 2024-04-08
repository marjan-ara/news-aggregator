import { Article, NewsFilter, NewsRes } from './types';

import { Article as newsApiArticle } from '../news_api/news_api.types';
import { Article as guardianArticle } from '../the_guardian/the_guardian.types';
import { Article as nyTimesArticle } from '../nyTimes/nyTimes.types';
import { news as newsApiGetNews } from '../news_api/news_api.api';
import { news as nyTimesGetNews } from '../nyTimes/nyTimes.api';
import { news as guardianGetNews } from '../the_guardian/the_guardian.api';
import store from '../../store';
import { compareByDate, convertToYYYYMMDD } from '../../utils';

const mapNewsApiResult = (article: newsApiArticle) => {
  const newsapiSources = store.getState().newsapi.sources;
  try {
    const mapped: Article = {
      source: 'NEWS API',
      author: article.author,
      title: article.title,
      description: article.content,
      webUrl: article.url,
      imageUrl: article.urlToImage,
      publishedAt: article.publishedAt,
      category: newsapiSources.find(item => item.id === article.source.id)?.category || '',
    };
    return mapped;
  } catch (error) {
    console.log('error in mapNewsApiResult', error);
  }
};

const getNewsApiArticles = async (params: NewsFilter) => {
  const newsapiSources = store
    .getState()
    .newsapi.sources.map(s => s.id)
    .join();
  const { pageSize, pageNumber, category, from, to, q, author } = params;

  try {
    const res = await newsApiGetNews({
      pageSize,
      page: pageNumber,
      q,
      sources: newsapiSources,
      from: !from ? '' : from.toISOString(),
      to: !to ? '' : to.toISOString(),
    });
    let filtered = res.articles;
    if (author?.length) filtered = filtered.filter(item => author.includes(item.author));
    // if (!!category.length)
    // filtered=filtered.filter(item=>category.includes(item.))
    filtered = filtered.filter(a => a.title !== '[Removed]');
    return filtered.map(item => mapNewsApiResult(item));
  } catch (error) {
    console.log('error in getNewsApiArticles', error);
    return [];
  }
};

const mapNRTimesResult = (article: nyTimesArticle) => {
  try {
    const mapped: Article = {
      source: 'New Yourk Times',
      author: article.byline?.original?.replace('By ', ''),
      title: article.snippet || '',
      description: article.snippet || '',
      webUrl: article.web_url,
      imageUrl: 'https://static01.nyt.com/'.concat(article.multimedia?.find(item => item.type === 'image')?.url || ''),
      publishedAt: article.pub_date,
      category: article.news_desk,
    };

    return mapped;
  } catch (error) {
    console.log('error in mapNRTimesResult:', error);
  }
};

const getNYTimesArticles = async (params: NewsFilter) => {
  const { pageSize, pageNumber, category, from, to, q, author } = params;
  try {
    const res = await nyTimesGetNews({
      page: pageNumber,
      q,
      fq: category?.length ? `news_desk:(${category.join()})` : '', //news_desk:("Sports", "Foreign")
      begin_date: convertToYYYYMMDD(from),
      end_date: convertToYYYYMMDD(to),
    });
    let filtered = res.response.docs;
    if (author?.length) filtered = filtered.filter(item => author.find(a => item.byline.original.includes(a)));
    return filtered.map(item => mapNRTimesResult(item));
  } catch (error) {
    console.log('error in getNYTimesArticles', error);
    return [];
  }
};

const mapGuardianResult = (article: guardianArticle) => {
  try {
    const mapped: Article = {
      source: 'The Guardian',
      author: '',
      title: article.webTitle,
      description: article.webTitle,
      webUrl: article.webUrl,
      imageUrl: article.elements?.find(e => e.type === 'image')?.assets.find(a => !!a.file)?.file,
      publishedAt: article.webPublicationDate,
      category: article.sectionName,
    };
    return mapped;
  } catch (error) {
    console.log('error in mapGuardianResult:', error);
  }
};

const getGuardianArticles = async (params: NewsFilter) => {
  const { pageSize, pageNumber, category, from, to, q, author } = params;
  try {
    const res = await guardianGetNews({
      q,
      section: category?.length ? category.join('|') : '', //sample `(A,B)|(C,D)|-D`
      'from-date': !from ? '' : from.toISOString(), // date in  ISO 8601 format
      'to-date': !to ? '' : to.toISOString(), // date in  ISO 8601 format
      page: pageNumber,
      'page-size': pageSize,
    });
    return res.response.results.map(item => mapGuardianResult(item));
  } catch (error) {
    console.log('error in getGuardianArticles', error);
    return [];
  }
};

export const getNews = async (params: NewsFilter) => {
  const { sources } = params;
  const requests = [];
  if (sources.includes('NEWS API')) requests.push(getNewsApiArticles(params));
  if (sources.includes('New Yourk Times')) requests.push(getNYTimesArticles(params));
  if (sources.includes('The Guardian')) requests.push(getGuardianArticles(params));
  const res = await Promise.all(requests);
  const articles: Article[] = Array.prototype.concat.apply([], res).sort(compareByDate);
  const output = { total: articles.length, articles };
  return output;
};
