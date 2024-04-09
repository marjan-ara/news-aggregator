import InfiniteScroll from 'react-infinite-scroller';
import { CircularProgress, IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import css from './feeds.module.scss';
import NewsCard from 'src/components/NewsCard';
import { useFeeds } from './useFeeds';
import NoResult from 'src/components/NoResult';
import FilterMenu from 'src/components/FilterMenu';

const Feeds = () => {
  const {
    newsItems,
    loadMore,
    hasMore,
    searchTerm,
    handleChangeSearch,
    fetchNews,
    handleEnterInput,
    loading,
    openFilterMenu,
    setOpenFilterMenu,
  } = useFeeds();
  return (
    <div className={css.container}>
      <div className={css.searchBar}>
        <div className={css.inputContainer}>
          <OutlinedInput
            id="search-input"
            value={searchTerm}
            onChange={e => handleChangeSearch(e.target.value)}
            onKeyUp={handleEnterInput}
            fullWidth
            placeholder="Search"
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={() => fetchNews()} edge="end">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
            size="small"
          />
        </div>
        <div className={css.buttonContainer}>
          <IconButton
            onClick={() => {
              console.log('test log click');
              setOpenFilterMenu(true);
            }}
          >
            <FilterListIcon />
          </IconButton>
          <IconButton>
            <SettingsIcon />
          </IconButton>
        </div>
      </div>
      {/* TO DO: replace key by news id  */}
      {loading ? (
        <div className={css.loaderContainer}>
          <CircularProgress size={90} />
        </div>
      ) : newsItems.length ? (
        <InfiniteScroll
          initialLoad={false}
          threshold={150}
          useWindow
          pageStart={1}
          loadMore={loadMore}
          hasMore={hasMore}
        >
          <div className={css.content}>
            <div className={css.gridContainer}>
              {newsItems.map((item, index) => (
                <div key={`${item.source}-${index}`}>
                  <NewsCard news={item} />
                </div>
              ))}
            </div>
          </div>
        </InfiniteScroll>
      ) : (
        <NoResult />
      )}
      {openFilterMenu && (
        <FilterMenu open={openFilterMenu} onClose={() => setOpenFilterMenu(false)} fetchNews={fetchNews} />
      )}
    </div>
  );
};

export default Feeds;
