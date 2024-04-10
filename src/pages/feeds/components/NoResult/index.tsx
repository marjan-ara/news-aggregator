import css from './NoResult.module.scss';
import image from 'src/assets/noresult.jpg';
import { Typography } from '@mui/material';

const NoResult = () => {
  return (
    <div className={css.container}>
      <img src={image} alt="" className={css.image} />
      <Typography variant="h3">No result found</Typography>
      <Typography variant="h5" sx={{ textAlign: 'center' }}>
        We didn't find any result for your search. Try changing key word and filters{' '}
      </Typography>
    </div>
  );
};

export default NoResult;
