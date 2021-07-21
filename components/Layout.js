import React from 'react';
import PropTypes from 'prop-types';
import LoginNav from './LoginNav';
import Header from './Header';
import styles from '../styles/Layout.module.css';

const Layout = ({children}) => {
  return (
    <>
      <LoginNav />
      <div className={styles.container}>
        <main className={styles.main}>
          <Header />
          {children}
        </main>
      </div>
    </>

  );
};

Layout.propTypes = {
  children: PropTypes.element,
};

export default Layout;