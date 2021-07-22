/**
 * @jest-environment jsdom
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import Register from '../pages/register';

describe('Register page', () => {
  test('Register page contains required fields', () => {
    render(<Register />);
    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
    expect(screen.getByText('Reconfirm password')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  test('Error(s) appear when username or password are empty', async () => {
    render(<Register />);
    await userEvent.type(screen.getByTestId('username'), 'bobbi');
    await userEvent.type(screen.getByTestId('password'), 'passsword');
    userEvent.click(screen.getByRole('button', {name: /register/i}));

    expect(screen.getByText(/Passwords do not match. Please try again/i)).toBeInTheDocument;
  });
});

