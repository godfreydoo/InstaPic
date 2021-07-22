import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useUser } from '../lib/hooks';
import axios from 'axios';

const initialState = {
  username: '',
  password: '',
  password2: '',
};

const RegisterForm = () => {
  const [user, { mutate }] = useUser();
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState([]);
  const [newUser, setNewUser] = useState({
    username: '',
    password: ''
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isProcessingRegisration, setIsProcessingRegisration] = useState(false);

  const handleFormChange = (e) => {
    setIsProcessingRegisration(false);
    setNewUser(prevFormDetails => { return {...prevFormDetails, [e.target.name]: e.target.value }; });
    if (e.target.name === 'password2') {
      setConfirmPassword(e.target.value);
    }
  };

  const validateNewUser = () => {
    setIsProcessingRegisration(true);
    let errorMessages = [];
    if (!newUser.username || !newUser.password) {
      errorMessages.push('Username and password must not be empty');
    }

    if (newUser.password.length < 6) {
      errorMessages.push('Password must be greater than 6 characters');
    }

    if (newUser.password !== confirmPassword) {
      errorMessages.push('Passwords do not match. Please try again');
    }

    if (errorMessages.length === 0) {
      createAccount();
    } else {
      setErrorMsg(errorMessages);
      setIsProcessingRegisration(false);
    }
  };

  useEffect(() => {
    setErrorMsg([]);
    if (user) {
      router.push('/home');
    }
  }, [newUser, user, router]);

  const createAccount = async () => {
    const config = {
      url: '/api/register',
      method: 'post',
      data: newUser,
      headers: { 'Content-Type': 'application/json' }
    };

    try {
      const { data } = await axios(config);
      if (data.username) {
        router.push('/login');
      }
    } catch (err) {
      setErrorMsg(['Your registration was unsuccessful. Please try again.']);
    } finally {
      setIsProcessingRegisration(false);
    }
  };

  return (
    <>
      {errorMsg.map((value, index) => {
        return (
          <li key={index} className="error">{value}</li>
        );
      })}
      <form noValidate>
        <section>
          <TextField
            inputProps={{ 'data-testid': 'username' }}
            label="Username"
            type="text"
            name="username"
            autoComplete="off"
            variant="outlined"
            autoFocus={true}
            required={true}
            value={newUser.username}
            onChange={handleFormChange}
          />
        </section>

        <section>
          <TextField
            inputProps={{ 'data-testid': 'password' }}
            label="Password"
            type="password"
            name="password"
            autoComplete="off"
            variant="outlined"
            required={true}
            value={newUser.password}
            onChange={handleFormChange}
          />
        </section>

        <section>
          <TextField
            inputProps={{ 'data-testid': 'password2' }}
            label="Reconfirm password"
            type="password"
            name="password2"
            autoComplete="off"
            variant="outlined"
            required={true}
            value={confirmPassword}
            onChange={handleFormChange}
          />
        </section>

        <Button
          variant="contained"
          color="primary"
          onClick={validateNewUser}
          disabled={isProcessingRegisration}
        >
          {isProcessingRegisration ? 'Creating account...' : 'Register'}
        </Button>

      </form>
    </>
  );
};

export default RegisterForm;