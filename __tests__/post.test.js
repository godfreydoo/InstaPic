/**
 * @jest-environment jsdom
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Post from '../components/Post';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Submitting posts', () => {

  test('Form will not be submitted without missing fields', async () => {
    const handleOnChange = jest.fn();
    render(<Post setShowModal={handleOnChange} />);

    await userEvent.click(screen.getByRole('button', {name: /submit now/i}));
    expect(screen.getByText(/Description and photo are required. Please try again./i)).toBeInTheDocument;
  });

});