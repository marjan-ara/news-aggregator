import { createAsyncThunk } from '@reduxjs/toolkit';
import { sources } from 'src/api/news_api/news_api.api';

export const getAllSources = createAsyncThunk('newsapi/getAllSources', async () => {
  const res = await sources({});
  return res.sources;
});
