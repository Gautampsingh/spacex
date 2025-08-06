import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import client from '../apollo/client';
import { GET_LAUNCHES } from '../graphql/queries';

export const fetchLaunches = createAsyncThunk(
  'launches/fetchLaunches',
  async () => {
    const { data } = await client.query({ query: GET_LAUNCHES });
    return data.launchesPast;

    // const { data: dataGetPages } = await client.query({ query: GET_LAUNCHES_BY_PAGE });
    // return {
    //   launches: data?.launchesPast,
    //   launchesByPage: dataGetPages?.launchesPast,
    // }
  }
);

const launchesSlice = createSlice({
  name: 'launches',
  initialState: {
    launches: [],
    // launchesByPage: [],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchLaunches.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLaunches.fulfilled, (state, action) => {
        state.loading = false;
        state.launches = action.payload;
        // state.launchesByPage = action.payload.launchesByPage;
      })
      .addCase(fetchLaunches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      });
  },
});

export default launchesSlice.reducer;