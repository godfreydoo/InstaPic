import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import axios from 'axios';

const initialState = {
  username: '',
  password: '',
  password2: '',
};

const RegisterForm = () => {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState('');
  const [newUser, setNewUser] = useState({
    username: '',
    password: ''
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isProcessingRegisration, setIsProcessingRegisration] = useState(false);

  const handleFormChange = (e) => {
    setNewUser(prevFormDetails => { return {...prevFormDetails, [e.target.name]: e.target.value }; });
    if (e.target.name === 'password2') {
      setConfirmPassword(e.target.value);
    }
  };

  const validateNewUser = () => {
    setIsProcessingRegisration(true);
    // if username is blank
    // if passwords do not match

    createAccount();
  };

  const createAccount = async () => {
    const config = {
      url: '/api/register',
      method: 'post',
      data: newUser,
      headers: { 'Content-Type': 'application/json' }
    };

    try {
      const res = await axios(config);
      router.push('/login');
    } catch (err) {
      console.log(err);
    } finally {
      setIsProcessingRegisration(false);
    }
  };

  return (
    <>
      <form noValidate>
        <section>
          <TextField
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