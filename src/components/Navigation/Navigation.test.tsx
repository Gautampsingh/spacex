import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../Login/AuthContext';
import Navigation from './Navigation';

test('does not render navigation if user is not authenticated', () => {
  render(
    <BrowserRouter>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </BrowserRouter>
  );
  expect(screen.queryByText(/SpaceX Energy/i)).not.toBeInTheDocument();
});