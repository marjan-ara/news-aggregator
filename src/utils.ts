import moment from 'moment';
import { Article } from './api/wrapper/types';

export const convertToYYYYMMDD = (val?: Date) => {
  if (!val) return;
  const mm = val.getMonth() + 1;
  const dd = val.getDate();
  const yyyy = val.getFullYear();
  return `${yyyy}${mm > 9 ? '' : '0'}${mm}${dd}`;
};

export const removeEmptyProps = (obj: Record<string | number, any> | any) => {
  if (!obj) return obj;
  return Object.entries(obj).reduce((prev, [key, value]) => {
    if (value) {
      Object.assign(prev, { [key]: value });
    }
    return prev;
  }, {});
};

export const toRelativeTime = (date: string) => {
  const isoStr = date;
  const newDate = new Date(isoStr);
  const timestamp = newDate.getTime();
  const difference = new Date().getTime() - new Date(timestamp).getTime();
  const daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
  const minutesDifference = Math.floor(difference / 1000 / 60);
  const secondsDifference = Math.floor(difference / 1000);

  if (daysDifference < 1) {
    if (minutesDifference < 60) {
      if (secondsDifference < 60) {
        return moment(timestamp).startOf('second').fromNow();
      }
      return moment(timestamp).startOf('minute').fromNow();
    }
    return moment(timestamp).startOf('hour').fromNow();
  } else {
    return moment(isoStr).format('DD/MM/YYYY');
  }
};

export const compareByDate = (a: Article, b: Article) => {
  const aDate = new Date(a.publishedAt);
  const bDate = new Date(b.publishedAt);
  return bDate > aDate ? 1 : aDate > bDate ? -1 : 0;
};
