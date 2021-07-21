import React from 'react';
import LoginLayout from '../components/LoginLayout';
import Nav from '../components/Nav';
import RegisterForm from '../components/RegisterForm';

const Register = () => {
  return (
    <LoginLayout>
      <RegisterForm />
    </LoginLayout>
  );
};

export default Register;
