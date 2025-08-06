import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Dashboard from './Dashboard';

const mockStore = configureStore([]);
const store = mockStore({
  launches: {
    launches: [
      {
        mission_name: 'Demo Mission',
        launch_success: true,
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

test('renders dashboard overview', () => {
  render(
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );
  expect(screen.getByText(/Dashboard Overview/i)).toBeInTheDocument();
  expect(screen.getByText(/Total: 1/i)).toBeInTheDocument();
});