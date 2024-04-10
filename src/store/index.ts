import { configureStore } from '@reduxjs/toolkit';
import { newsapiSlice } from './reducers/newsapi.reducer';

const store = configureStore({
  reducer: {
    newsapi: newsapiSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
