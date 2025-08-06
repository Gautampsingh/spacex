import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

test('pagination navigation', () => {
  const onPageChange = jest.fn();
  render(<Pagination currentPage={1} totalPages={3} onPageChange={onPageChange} />);
  fireEvent.click(screen.getByText(/Next/i));
  expect(onPageChange).toHaveBeenCalledWith(2);
  fireEvent.click(screen.getByText(/Previous/i));
  expect(onPageChange).toHaveBeenCalledWith(0);
});