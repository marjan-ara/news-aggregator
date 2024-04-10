import { Category, Filter, NewsSource } from 'src/api/wrapper/types';
import moment from 'moment';
import { useState } from 'react';

export const useFilterMenu = (
  fetchNews: (sources?: NewsSource[]) => void,
  onClose: () => void,
  categories: Category[],
  authors: string[],
  filters: Filter,
  setFilters: (val: Filter) => void,
) => {
  const sourceArray = ['News API', 'New Yourk Times', 'The Guardian'];
  const [categoryList, setCategoryList] = useState(categories);

  const [searchCategory, setSearchCategory] = useState('');
  const [selectAllCategories, setSelectAllCategories] = useState(false);
  const [selectAllAuthors, setSelectAllAuthors] = useState(Boolean);
  const [authorList, setAuthorList] = useState(authors);
  const [searchAuthor, setSearchAuthor] = useState('');
  const [alert, setAlert] = useState<{
    open: boolean;
    severity: 'success' | 'info' | 'warning' | 'error';
    description: string;
  }>({ open: false, severity: 'success', description: '' });

  const handleChangeSource = (e: React.ChangeEvent<HTMLInputElement>) => {
    let src = [...(filters.sources || [])];
    const value = e.target.value as NewsSource;
    if (!src?.includes(value)) src.push(value);
    else src = src?.filter(item => item !== value);
    setFilters({ ...filters, sources: src });
  };

  const handleChangeCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    let categoryLst = [...(filters.category || [])];
    const categoryItem = categoryList.find(item => item.id === e.target.value);
    if (!categoryLst.find(item => item.id === categoryItem?.id)) categoryLst.push(categoryItem!);
    else categoryLst = categoryLst?.filter(item => item.id !== categoryItem?.id);
    setFilters({ ...filters, category: categoryLst });
  };

  const handleSearch = () => {
    fetchNews();
    onClose();
  };

  const handleSearchCategory = (searchTerm: string) => {
    setSearchCategory(searchTerm);
    const lowerSearchTerm = searchTerm.toLowerCase();
    const filtered = categories.filter(item => item.name.toLowerCase().includes(lowerSearchTerm));
    setCategoryList(filtered);
  };

  const handleChangeSelectAllCategories = () => {
    const checked = !selectAllCategories;
    setSelectAllCategories(checked);
    let selected = [...(filters.category || [])];
    if (checked) selected = [...selected, ...categoryList];
    else selected = selected.filter(item => !categoryList.map(c => c.id).includes(item.id));
    setFilters({ ...filters, category: selected });
  };

  const handleChangeSelectAllAuthors = () => {
    const checked = !selectAllAuthors;
    setSelectAllAuthors(checked);
    let selected = [...(filters.author || [])];
    if (checked) selected = [...selected, ...authorList];
    else selected = selected.filter(item => !authorList.includes(item));
    setFilters({ ...filters, author: selected });
  };

  const handleSearchAuthor = (searchTerm: string) => {
    setSearchAuthor(searchTerm);
    const lowerSearchTerm = searchTerm.toLowerCase();
    const filtered = authors.filter(item => item.toLowerCase().includes(lowerSearchTerm));
    setAuthorList(filtered);
  };

  const handleChangeAuthor = (e: React.ChangeEvent<HTMLInputElement>) => {
    let authorLst = [...(filters.author || [])];
    const { value } = e.target;
    if (!authorLst?.includes(value)) authorLst.push(value);
    else authorLst = authorLst?.filter(item => item !== value);
    setFilters({ ...filters, author: authorLst });
  };

  const handleChangeFrom = (value: moment.Moment | null) => {
    setFilters({ ...filters, from: value?.toDate() });
  };
  const handleChangeTo = (value: moment.Moment | null) => {
    setFilters({ ...filters, to: value?.toDate() });
  };

  const handleSaveFilters = () => {
    localStorage.setItem('filters', JSON.stringify(filters));
    setAlert({
      open: true,
      severity: 'success',
      description: 'Filters saved successfully to customize your news feed',
    });
  };

  const handleRemoveFilters = () => {
    localStorage.removeItem('filters');
    setAlert({ open: true, severity: 'warning', description: 'Saved filters removed.' });
  };

  return {
    sourceArray,
    handleChangeSource,
    handleSearch,
    handleChangeCategory,
    categoryList,
    searchCategory,
    handleSearchCategory,
    selectAllCategories,
    handleChangeSelectAllCategories,
    selectAllAuthors,
    handleChangeSelectAllAuthors,
    searchAuthor,
    handleSearchAuthor,
    authorList,
    handleChangeAuthor,
    handleChangeFrom,
    handleChangeTo,
    handleSaveFilters,
    handleRemoveFilters,
    alert,
    setAlert,
  };
};
