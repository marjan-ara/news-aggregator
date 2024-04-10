import { createSlice } from '@reduxjs/toolkit';
import { Category, Source } from 'src/api/news_api/news_api.types';
import { getAllSources } from 'src/store/thunks/newsapi.thunk';

interface NewsApiState {
  sources: Source[];
  categories: Category[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string;
}

const initialState = {
  sources: [],
  categories: ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'],
  status: 'idle',
  error: '',
} as NewsApiState;

export const newsapiSlice = createSlice({
  name: 'newsapi',
  initialState,
  reducers: {
    setSources: (state, action) => {
      state.sources = action.payload.items;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getAllSources.pending, state => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(getAllSources.fulfilled, (state, action) => {
        state.sources = action.payload;
        state.status = 'succeeded';
        state.error = '';
      })
      .addCase(getAllSources.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || '';
      });
  },
});

export const { setSources } = newsapiSlice.actions;
