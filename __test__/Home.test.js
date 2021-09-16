import React from 'react';
import { render } from '@testing-library/react-native';
import Home from '../components/Home';

test('should have the home page title', () => {
  const { getByTestId } = render(<Home />);
  expect(getByTestId('home-title')).toBeTruthy();
});

test('should have the get started action', () => {
  const { getByTestId } = render(<Home />);
  expect(getByTestId('get-started-action')).toBeTruthy();
});

it('should have the get started text', () => {
  const { getByTestId } = render(<Home />);
  expect(getByTestId('get-started-text')).toBeTruthy();
});
