import { useSelector } from 'react-redux';
import store, { RootState } from 'src/store';
import { Source } from 'src/api/news_api/news_api.types';
import { Article, Category, Filter } from 'src/api/wrapper/types';
import { useEffect, useState } from 'react';
import { getAllSources } from 'src/store/thunks/newsapi.thunk';
import { getCategories, getNews } from 'src/api/wrapper/services';

export const useFeeds = () => {
  const newsapiSources = useSelector<RootState, Source[]>(state => state.newsapi.sources);
  const [loading, setLoading] = useState(false);
  const [categories, setcategories] = useState<Category[]>([]);
  const [authors, setAuthors] = useState<string[]>([]);
  const [newsItems, setNewsItems] = useState<Article[]>([]);
  const [hasMore, sethasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [openFilterMenu, setOpenFilterMenu] = useState(false);
  const [filters, setfilters] = useState<Filter>({ author: [], category: [], sources: [] });

  const fetchCategories = async () => {
    const res = await getCategories();
    setcategories(res);
  };

  useEffect(() => {
    if (!newsapiSources.length) store.dispatch(getAllSources());
    fetchCategories();
    const savedFilters = localStorage.getItem('filters');
    if (!!savedFilters) setfilters(JSON.parse(savedFilters));
  }, []);

  const fetchNews = async () => {
    if (!newsapiSources.length) return;
    setLoading(true);
    try {
      const res = await getNews({
        q: searchTerm,
        pageNumber: 1,
        pageSize: 10,
        ...filters,
      });
      setNewsItems(res.articles);
      const autherList = new Set([
        ...(filters.author || []),
        ...res.articles.filter(item => !!item.author).map(item => item.author || ''),
      ]);
      setAuthors(Array.from(autherList));
      setLoading(false);
    } catch (e) {
      console.log('error in fetchNews', e);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [newsapiSources]);

  const loadMore = async () => {
    if (hasMore) {
      try {
        const res = await getNews({
          pageNumber: page,
          pageSize: 10,
          q: searchTerm,
          ...filters,
        });
        if (res.articles.length) {
          const newItems = [...newsItems, ...res.articles];
          setNewsItems(newItems);
          const autherList = new Set([
            ...(filters.author || []),
            ...newItems.filter(item => !!item.author).map(item => item.author || ''),
          ]);
          setAuthors(Array.from(autherList));
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
    openFilterMenu,
    setOpenFilterMenu,
    categories,
    authors,
    filters,
    setfilters,
  };
};
