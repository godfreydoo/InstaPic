import React from 'react';
import Link from 'next/link';
import navStyles from '../styles/Nav.module.css';

const LoginNav = () => {
  return (
    <nav className={navStyles.nav}>
      <ul>
        <li>
          <Link href="/login">Log In</Link>
        </li>
        <li>
          <Link href="/register">Register</Link>
        </li>
      </ul>
    </nav>
  );
};

export default LoginNav;