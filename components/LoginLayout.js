import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Login.module.css';

const LoginLayout = ({ children }) => {
  return (
    <div className={styles.parentContainer}>
      <div className={styles.container}>
        {children}
      </div>
    </div>
  );
};

LoginLayout.propTypes = {
  children: PropTypes.object,
};

export default LoginLayout;