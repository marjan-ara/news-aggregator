import { createSlice } from '@reduxjs/toolkit';
import { Source } from '../../api/news_api/news_api.types';
import { getAllSources } from '../thunks/newsapi.thunk';

interface NewsApiState {
  sources: Source[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string;
}

const initialState = {
  sources: [],
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
