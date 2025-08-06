import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import EnergyInformation from './EnergyInformation';

const mockStore = configureStore([]);
const store = mockStore({
  launches: {
    launches: [
      {
        mission_name: 'Demo Mission',
        mission_id: ['1'],
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

test('renders energy information page', () => {
  render(
    <Provider store={store}>
      <EnergyInformation />
    </Provider>
  );
  expect(screen.getByText(/Select Launches/i)).toBeInTheDocument();
  expect(screen.getByText(/Demo Mission/i)).toBeInTheDocument();
  fireEvent.click(screen.getByTitle(/show filters/i));
  expect(screen.getByPlaceholderText(/Mission name/i)).toBeInTheDocument();
});