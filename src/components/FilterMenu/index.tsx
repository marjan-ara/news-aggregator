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
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import css from './FilterMenu.module.scss';
import { useFilterMenu } from './useFilterMenu';
import { Article, NewsSource } from '@/src/api/wrapper/types';
interface FilterMenuProps {
  open: boolean;
  onClose: () => void;
  fetchNews: (sources?: NewsSource[]) => void;
}
const FilterMenu: React.FC<FilterMenuProps> = ({ open, onClose, fetchNews }) => {
  const { sourceArray, selectedSources, handleChangeSource, handleSearch } = useFilterMenu(fetchNews, onClose);
  useEffect(() => {
    console.log('test log selectedSources', selectedSources);
  }, [selectedSources]);

  return (
    <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={open}>
      <Slide direction="left" in={open} mountOnEnter unmountOnExit>
        <div className={css.container} id="notification">
          <div className={css.header}>
            <Typography variant="subtitle1" className={css.textGray900}>
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
                      <Checkbox value={item} checked={selectedSources?.includes(item)} onChange={handleChangeSource} />
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit
              leo lobortis eget.
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>Authors</AccordionSummary>
            <AccordionDetails>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit
              leo lobortis eget.
            </AccordionDetails>
          </Accordion>
          <div className={css.actionDiv}>
            <Button variant="outlined" color="primary" size="small" fullWidth>
              Save filters
            </Button>
            <Button variant="contained" color="primary" size="small" fullWidth onClick={handleSearch}>
              apply
            </Button>
          </div>
        </div>
      </Slide>
    </Backdrop>
  );
};

export default FilterMenu;
