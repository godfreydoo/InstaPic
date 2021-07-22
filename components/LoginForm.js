import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useUser } from '../lib/hooks';
import { useCookies } from 'react-cookie';
import axios from 'axios';


const initialState = {
  user: '',
  password: '',
};

const LoginForm = () => {
  const router = useRouter();
  const [user, { mutate }] = useUser();
  const [cookie, setCookie] = useCookies(['user']);
  const [errorMsg, setErrorMsg] = useState('');
  const [existingUser, setExistingUser] = useState({
    username: '',
    password: '',
  });
  const [isProcessingLogin, setIsProcessingLogin] = useState(false);

  const handleFormChange = (e) => {
    setIsProcessingLogin(false);
    setExistingUser(prevFormDetails => { return {...prevFormDetails, [e.target.name]: e.target.value }; });
  };

  const validateExistingUser = () => {
    setIsProcessingLogin(true);
    if (!existingUser.username || !existingUser.password) {
      setErrorMsg('Username and password must not be empty.');
      setIsProcessingLogin(false);
    } else {
      logInAccount();
    }
  };

  const setCookieInBrowser = (user) => {
    setCookie('user', user, {
      path: '/',
      maxAge: 60 * 60 * 3,
      sameSite: true,
    });
  };

  const logInAccount = async () => {
    const config = {
      url: '/api/login',
      method: 'post',
      data: existingUser,
      headers: { 'Content-Type': 'application/json' }
    };

    try {
      const { data } = await axios(config);
      mutate(data);
      setCookieInBrowser(data.user);
      if (data.user) {
        router.push('/home');
      }
    } catch (err) {
      setErrorMsg('Incorrect username or password');
    } finally {
      setIsProcessingLogin(false);
    }
  };

  useEffect(() => {
    // redirect to home if user is already authenticated
    if (user) {
      router.push('/home');
    }
  }, [user]);

  return (
    <>
      {errorMsg && <p data-testid="errorMsg" className="error">{errorMsg}</p>}
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
            value={existingUser.username}
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