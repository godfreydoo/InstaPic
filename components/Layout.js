import React from 'react';
import PropTypes from 'prop-types';
import Nav from './Nav';
import Header from './Header';
import styles from '../styles/Layout.module.css';

const Layout = ({children}) => {
  return (
    <>
      <Nav />
      <div className={styles.container}>
        <main className={styles.grid}>
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