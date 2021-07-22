/**
 * @jest-environment jsdom
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from '../pages/home';

test('Example test', () => {
  render(<Home />);
  expect(screen.getByText('Home page')).toBeInTheDocument();
});