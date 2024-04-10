import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Backdrop,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  Slide,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import css from './FilterMenu.module.scss';
import { useFilterMenu } from './useFilterMenu';
import { NewsSource, Category, Filter } from 'src/api/wrapper/types';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import Alert from 'src/components/Alert';

interface FilterMenuProps {
  open: boolean;
  onClose: () => void;
  fetchNews: () => void;
  categories: Category[];
  authors: string[];
  filters: Filter;
  setFilters: (val: Filter) => void;
}
const FilterMenu: React.FC<FilterMenuProps> = ({
  open,
  onClose,
  fetchNews,
  categories,
  authors,
  filters,
  setFilters,
}) => {
  const {
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
  } = useFilterMenu(fetchNews, onClose, categories, authors, filters, setFilters);

  return (
    <>
      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={open}>
        <Slide direction="left" in={open} mountOnEnter unmountOnExit>
          <div className={css.container} id="notification">
            <div className={css.header}>
              <Typography variant="subtitle1" className={css.textGray900} sx={{ fontWeight: '600' }}>
                Filters
              </Typography>
              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </div>
            <Accordion sx={{ border: 'none' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>Sources</AccordionSummary>
              <AccordionDetails>
                <FormGroup>
                  {sourceArray.map(item => (
                    <FormControlLabel
                      key={item}
                      control={
                        <Checkbox
                          value={item}
                          checked={filters.sources?.includes(item as NewsSource)}
                          onChange={handleChangeSource}
                        />
                      }
                      label={item}
                    />
                  ))}
                </FormGroup>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>Categories</AccordionSummary>
              <AccordionDetails>
                <div className={css.row}>
                  <Checkbox
                    checked={selectAllCategories}
                    onChange={handleChangeSelectAllCategories}
                    sx={{ paddingLeft: 0 }}
                  />
                  <TextField
                    size="small"
                    placeholder="Search category"
                    value={searchCategory}
                    onChange={e => handleSearchCategory(e.target.value)}
                    fullWidth
                  />
                </div>
                <FormGroup>
                  {categoryList.map(item => (
                    <FormControlLabel
                      key={item.id}
                      control={
                        <Checkbox
                          value={item.id}
                          checked={!!filters.category?.find(c => c.id === item.id)}
                          onChange={handleChangeCategory}
                        />
                      }
                      label={item.name}
                    />
                  ))}
                </FormGroup>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>Authors</AccordionSummary>
              <AccordionDetails>
                <div className={css.row}>
                  <Checkbox
                    checked={selectAllAuthors}
                    onChange={handleChangeSelectAllAuthors}
                    sx={{ paddingLeft: 0 }}
                  />
                  <TextField
                    size="small"
                    placeholder="Search author"
                    value={searchAuthor}
                    onChange={e => handleSearchAuthor(e.target.value)}
                    fullWidth
                  />
                </div>
                <FormGroup>
                  {authorList.map(item => (
                    <FormControlLabel
                      key={item}
                      control={
                        <Checkbox value={item} checked={filters.author?.includes(item)} onChange={handleChangeAuthor} />
                      }
                      label={item}
                    />
                  ))}
                </FormGroup>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>Date</AccordionSummary>
              <AccordionDetails>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    value={filters.from ? moment(filters.from) : null}
                    onChange={handleChangeFrom}
                    sx={{ width: '100%' }}
                    label="From"
                    format="DD/MM/YYYY"
                    maxDate={moment(filters.to)}
                    slotProps={{
                      field: { clearable: true, onClear: () => setFilters({ ...filters, from: undefined }) },
                    }}
                  />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    value={filters.to ? moment(filters.to) : null}
                    onChange={handleChangeTo}
                    sx={{ width: '100%', marginTop: '0.5rem' }}
                    label="To"
                    format="DD/MM/YYYY"
                    maxDate={moment(new Date())}
                    slotProps={{
                      field: { clearable: true, onClear: () => setFilters({ ...filters, to: undefined }) },
                    }}
                  />
                </LocalizationProvider>
              </AccordionDetails>
            </Accordion>
            <div className={css.actionDiv}>
              <Button
                className={css.btn}
                variant="outlined"
                color="primary"
                size="medium"
                fullWidth
                onClick={() => setFilters({})}
              >
                Clear filters
              </Button>
              <Button
                className={css.btn}
                variant="contained"
                color="primary"
                size="medium"
                fullWidth
                onClick={handleSearch}
              >
                Search
              </Button>
            </div>

            <Button className={css.btn} variant="text" color="primary" fullWidth onClick={handleSaveFilters}>
              Save filters to customize your news feeds
            </Button>
            <Button className={css.btn} variant="text" color="secondary" fullWidth onClick={handleRemoveFilters}>
              Remove saved filters
            </Button>
          </div>
        </Slide>
      </Backdrop>
      <Alert
        display={alert.open}
        setDisplay={(val: boolean) => setAlert({ ...alert, open: val })}
        severity={alert.severity}
        icon={<CheckIcon fontSize="inherit" />}
        title=""
        description={alert.description}
      />
    </>
  );
};

export default FilterMenu;
