/**
 * @jest-environment jsdom
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Nav from '../components/Nav';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Navigation bar', () => {

  test('Navigation bar will show appropriate headers to logged in users', async () => {
    const handleOnChange = jest.fn();
    render(<Nav setShowModal={handleOnChange} />);

    expect(screen.getByText(/Log In/i)).toBeInTheDocument;
    expect(screen.getByText(/Register/i)).toBeInTheDocument;
  });

});