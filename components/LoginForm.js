import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import axios from 'axios';


const initialState = {
  user: '',
  password: '',
};

const LoginForm = () => {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState('');
  const [existingUser, setExistingUser] = useState({
    username: '',
    password: '',
  });
  const [isProcessingLogin, setIsProcessingLogin] = useState(false);

  const handleFormChange = (e) => {
    setExistingUser(prevFormDetails => { return {...prevFormDetails, [e.target.name]: e.target.value }; });
  };

  const validateExistingUser = () => {
    setIsProcessingLogin(true);
    // if username or password is blank

    logInAccount();
  };

  const logInAccount = async () => {
    const config = {
      url: '/api/login',
      method: 'post',
      data: existingUser,
      headers: { 'Content-Type': 'application/json' }
    };

    try {
      const res = await axios(config);
      router.push('/home');
    } catch (err) {
      // handle error
    } finally {
      setIsProcessingLogin(false);
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
            value={existingUser.username}
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
            value={existingUser.password}
            onChange={handleFormChange}
          />
        </section>

        <Button
          variant="contained"
          color="primary"
          onClick={validateExistingUser}
          disabled={isProcessingLogin}
        >
          {isProcessingLogin ? 'Logging in...' : 'Log In'}
        </Button>

      </form>
    </>
  );
};

export default LoginForm;