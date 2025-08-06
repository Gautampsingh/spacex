import launchesReducer, { fetchLaunches } from './launchesSlice';

const initialState = {
  launches: [],
  launchesByPage: [],
  loading: false,
  error: null,
};

test('should handle initial state', () => {
  expect(launchesReducer(undefined, { type: 'unknown' })).toEqual(initialState);
});

test('should handle fetchLaunches.pending', () => {
  const action = { type: fetchLaunches.pending.type };
  const state = launchesReducer(initialState, action);
  expect(state.loading).toBe(true);
  expect(state.error).toBeNull();
});

test('should handle fetchLaunches.fulfilled', () => {
  const payload = [{ mission_name: 'Demo' }];
  const action = { type: fetchLaunches.fulfilled.type, payload };
  const state = launchesReducer(initialState, action);
  expect(state.loading).toBe(false);
  expect(state.launches).toEqual(payload);
});

test('should handle fetchLaunches.rejected with error', () => {
  const action = { type: fetchLaunches.rejected.type, error: { message: 'Failed' } };
  const state = launchesReducer(initialState, action);
  expect(state.loading).toBe(false);
  expect(state.error).toBe('Failed');
});

test('should handle fetchLaunches.rejected with no error message', () => {
  const action = { type: fetchLaunches.rejected.type, error: {} };
  const state = launchesReducer(initialState, action);
  expect(state.loading).toBe(false);
  expect(state.error).toBeNull();
});