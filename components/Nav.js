import React, { useState } from 'react';
import Link from 'next/link';
import ComposeModal from './ComposeModal';
import Post from './Post';
import navStyles from '../styles/Nav.module.css';
import { useRouter } from 'next/router';
import axios from 'axios';

const LoginNav = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
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

  const handleShowModal = () => {
    setShowModal(prev => !prev);
  };

  return (
    <>
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
          <li>
            <Link href="/home">Home</Link>
          </li>
          <li>
            <a role="button" onClick={handleShowModal}>Post</a>
          </li>
        </ul>
      </nav>
      {showModal && <ComposeModal body={<Post/>} handleShowModal={handleShowModal}/>}
    </>
  );
};

export default LoginNav;