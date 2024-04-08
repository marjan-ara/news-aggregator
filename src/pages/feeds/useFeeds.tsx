import { useSelector } from 'react-redux';
import store, { RootState } from '../../store';
import { Source } from '../../api/news_api/news_api.types';
import { Article } from '../../api/wrapper/types';
import { useEffect, useState } from 'react';
import { getAllSources } from '../../store/thunks/newsapi.thunk';
import { getNews } from '../../api/wrapper/services';

export const useFeeds = () => {
  const newsapiSources = useSelector<RootState, Source[]>(state => state.newsapi.sources);
  const [loading, setLoading] = useState(false);
  const [newsItems, setNewsItems] = useState<Article[]>([]);
  const [hasMore, sethasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!newsapiSources.length) store.dispatch(getAllSources());
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await getNews({
        sources: ['NEWS API', 'New Yourk Times', 'The Guardian'],
        q: searchTerm,
        pageNumber: 1,
        pageSize: 10,
      });
      setNewsItems(res.articles);
      setLoading(false);
    } catch (e) {
      console.log('error in fetchNews', e);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!newsapiSources.length) return;
    fetchNews();
  }, [newsapiSources]);

  const loadMore = async () => {
    if (hasMore) {
      try {
        const res = await getNews({
          sources: ['NEWS API', 'New Yourk Times', 'The Guardian'],
          pageNumber: page,
          pageSize: 10,
          q: searchTerm,
        });
        if (res.articles.length) {
          setNewsItems([...newsItems, ...res.articles]);
          setPage(page + 1);
        } else {
          sethasMore(false);
        }
      } catch (e) {
        console.log('error in loadMore', e);
      }
    }
  };

  const handleChangeSearch = (val: string) => {
    setSearchTerm(val);
  };

  const handleEnterInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      fetchNews();
    }
  };
  return {
    newsItems,
    loadMore,
    hasMore,
    handleChangeSearch,
    searchTerm,
    fetchNews,
    handleEnterInput,
    loading,
  };
};
