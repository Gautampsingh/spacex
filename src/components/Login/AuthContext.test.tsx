import { render, act, screen } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthContext';

const TestComponent = () => {
  const { user, login, logout } = useAuth();
  return (
    <div>
      <span data-testid="user">{user ? 'logged-in' : 'logged-out'}</span>
      <button onClick={() => login('admin', 'admin123')}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

test('auth context login/logout', () => {
  render(
    <AuthProvider>
      <TestComponent />
    </AuthProvider>
  );
  expect(screen.getByTestId('user')).toHaveTextContent('logged-out');
  act(() => { screen.getByText('Login').click(); });
  expect(screen.getByTestId('user')).toHaveTextContent('logged-in');
  act(() => { screen.getByText('Logout').click(); });
  expect(screen.getByTestId('user')).toHaveTextContent('logged-out');
});