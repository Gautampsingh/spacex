import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Launches from './Launches';

const mockStore = configureStore([]);
const store = mockStore({
  launches: {
    launches: [
      {
        mission_name: 'Demo Mission',
        launch_date_utc: '2022-01-01',
        rocket: {
          rocket_name: 'Falcon 9',
          rocket: {
            id: '1',
            mass: { kg: 1000 },
            payload_weights: [{ kg: 500 }]
          }
        }
      }
    ],
    loading: false,
    error: null
  }
});

test('renders launches', () => {
  render(
    <Provider store={store}>
      <Launches />
    </Provider>
  );
  expect(screen.getByText(/Demo Mission/i)).toBeInTheDocument();
});