import React from 'react';
import { Article } from '../../api/wrapper/types';
import css from './NewsCard.module.scss';
import { Link, Typography } from '@mui/material';
import { toRelativeTime } from '../../utils';

interface NewsCardProps {
  news: Article;
}
const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  return (
    <div className={css.container}>
      <div className={css.categoryContainer}>
        <div className={css.category}>{news.category}</div>
      </div>
      <div className={css.imageContainer}>
        <img className={css.image} src={news.imageUrl} alt="" />
      </div>
      <Typography variant="caption" className={css.caption}>
        {`${news.source} . ${toRelativeTime(news.publishedAt)}${news.author ? ` . By ${news.author}` : ''}`}
      </Typography>
      <Typography variant="subtitle1" className={css.title}>
        {news.title}
      </Typography>
      <Link href={news.webUrl} color="inherit" target="_blank" className={css.link}>
        Read more
      </Link>
    </div>
  );
};

export default NewsCard;
