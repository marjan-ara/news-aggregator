import { Article, QueryFilter, NewsSource } from './types';

import { Article as newsApiArticle } from 'src/api/news_api/news_api.types';
import { Article as guardianArticle, Category as theGuardianCategory } from 'src/api/the_guardian/the_guardian.types';
import { Article as nyTimesArticle, CATEGORIES } from 'src/api/nyTimes/nyTimes.types';
import { news as newsApiGetNews } from 'src/api/news_api/news_api.api';
import { news as nyTimesGetNews } from 'src/api/nyTimes/nyTimes.api';
import { news as guardianGetNews, categories as getGuardianCategories } from 'src/api/the_guardian/the_guardian.api';
import store from 'src/store';
import { compareByDate, convertToYYYYMMDD } from 'src/utils';

const mapNewsApiResult = (article: newsApiArticle) => {
  const newsapiSources = store.getState().newsapi.sources;
  try {
    const mapped: Article = {
      source: 'News API',
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

const getNewsApiArticles = async (params: QueryFilter) => {
  let newsapiSources = store
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

    filtered = filtered.filter(a => a.title !== '[Removed]');
    let mapped = filtered.map(item => mapNewsApiResult(item));
    if (category?.length) mapped = mapped.filter(item => item && !!category.find(c => c.name === item.category));
    return mapped;
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
      category: article.section_name,
    };

    return mapped;
  } catch (error) {
    console.log('error in mapNRTimesResult:', error);
  }
};

const getNYTimesArticles = async (params: QueryFilter) => {
  const { pageNumber, category, from, to, q, author } = params;
  try {
    const res = await nyTimesGetNews({
      page: pageNumber,
      q,
      fq: category?.length ? `section_name:(${category.map(item => `"${item.name}"`).join()})` : '', //section_name:("Sports", "Foreign")
      begin_date: convertToYYYYMMDD(from),
      end_date: convertToYYYYMMDD(to),
    });
    let filtered = res.response.docs;
    if (author?.length) filtered = filtered.filter(item => author.find(a => item.byline.original?.includes(a)));
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

const getGuardianArticles = async (params: QueryFilter) => {
  const { pageSize, pageNumber, category, from, to, q, author } = params;
  if (author?.length) return [];
  try {
    const res = await guardianGetNews({
      q,
      section: category?.length ? category.map(item => item.name.toLocaleLowerCase()).join('|') : '', //sample `(A,B)|(C,D)|-D`
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

export const getNews = async (params: QueryFilter) => {
  let sources = [...(params.sources || [])];
  if (!sources.length) sources = ['News API', 'New Yourk Times', 'The Guardian'];
  const requests = [];

  if (sources?.includes('News API')) requests.push(getNewsApiArticles(params));
  if (sources?.includes('New Yourk Times')) requests.push(getNYTimesArticles(params));
  if (sources?.includes('The Guardian')) requests.push(getGuardianArticles(params));

  const res = await Promise.all(requests);
  const articles: Article[] = Array.prototype.concat.apply([], res).sort(compareByDate);
  const output = { total: articles.length, articles };
  return output;
};

const mapTheGuardianCategory = (category: theGuardianCategory) => {
  return { id: `TheGuardian-${category.id}`, name: category.webTitle, source: 'The Guardian' as NewsSource };
};

export const getCategories = async () => {
  const newsApiCategories = store.getState().newsapi.categories.map(item => {
    return { id: `NewsAPI-${item.toString()}`, name: item.toString(), source: 'News API' as NewsSource };
  });
  const nyTimesCategories = CATEGORIES.map(item => {
    return { id: `NewYourkTimes-${item}`, name: item, source: 'New Yourk Times' as NewsSource };
  });
  const theGuardianCategories = (await getGuardianCategories()).response.results.map(item =>
    mapTheGuardianCategory(item),
  );

  return newsApiCategories.concat(nyTimesCategories).concat(theGuardianCategories);
};
