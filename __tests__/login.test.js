/**
 * @jest-environment jsdom
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import Login from '../pages/login';

describe('Log In page', () => {
  test('Log in page contains required fields', () => {
    render(<Login />);
    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
    expect(screen.getByText('Log In')).toBeInTheDocument();
  });

  test('Upon login, login process has started', async () => {
    render(<Login />);
    await userEvent.type(screen.getByTestId('username'), 'bobbi');
    await userEvent.type(screen.getByTestId('password'), 'password');
    await userEvent.click(screen.getByRole('button', {name: /log in/i}));

    expect(screen.getByText(/Logging in.../i)).toBeInTheDocument;
  });

  test('Error(s) appear when username or password are empty', async () => {
    render(<Login />);
    await userEvent.type(screen.getByTestId('username'), 'bobbi');
    await userEvent.click(screen.getByRole('button', {name: /log in/i}));

    expect(screen.getByText(/Username and password must not be empty./i)).toBeInTheDocument;

  });
});

