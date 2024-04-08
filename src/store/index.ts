import { configureStore } from '@reduxjs/toolkit';

import { spinnerSlice } from './reducers/spinner.reducer';
import { newsapiSlice } from './reducers/newsapi.reducer';

const store = configureStore({
  reducer: {
    spinner: spinnerSlice.reducer,
    newsapi: newsapiSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
