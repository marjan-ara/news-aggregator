import { createAsyncThunk } from '@reduxjs/toolkit';
import { sources } from '../../api/news_api/news_api.api';

export const getAllSources = createAsyncThunk('newsapi/getAllSources', async () => {
  const res = await sources({});
  return res.sources;
});
