import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { NewsSource } from '@/src/api/wrapper/types';
import { useEffect } from 'react';

const schema = yup
  .object()
  .shape({
    sources: yup.array(),
    categories: yup.array(),
    authors: yup.array(),
  })
  .required();

export const useFilterMenu = (fetchNews: (sources?: NewsSource[]) => void, onClose: () => void) => {
  const sourceArray = ['News API', 'New Yourk Times', 'The Guardian'];
  const { getValues, setValue } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const handleChangeSource = (e: React.ChangeEvent<HTMLInputElement>) => {
    let src = getValues('sources') || [];
    const { value, checked } = e.target;
    console.log('test log src1', src);
    console.log('test log', checked);
    if (!src?.includes(value)) src.push(value);
    else src = src?.filter(item => item !== value);
    console.log('test log src2', src);
    setValue('sources', src);
  };

  const handleSearch = () => {
    const selectedSources = getValues('sources');
    console.log('test log selectedSources', selectedSources);
    fetchNews(selectedSources);
    onClose();
  };
  return { sourceArray, selectedSources: getValues('sources'), handleChangeSource, handleSearch };
};
