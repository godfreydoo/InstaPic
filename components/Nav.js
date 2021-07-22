import React from 'react';
import Link from 'next/link';
import navStyles from '../styles/Nav.module.css';
import { useRouter } from 'next/router';
import axios from 'axios';

const LoginNav = () => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      let res = await fetch('/api/logout');
      if (res.status === 204) {
        router.push('/login');
      }
    } catch (err) {
      // handle error
    }
  };

  return (
    <nav className={navStyles.nav}>
      <ul>
        <li>
          <Link href="/login">Log In</Link>
        </li>
        <li>
          <Link href="/register">Register</Link>
        </li>
        <li>
          <a role="button" onClick={handleLogout}>Logout</a>
        </li>
      </ul>
    </nav>
  );
};

export default LoginNav;