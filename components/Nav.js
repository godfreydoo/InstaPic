import React, { useState } from 'react';
import Link from 'next/link';
import ComposeModal from './ComposeModal';
import Post from './Post';
import navStyles from '../styles/Nav.module.css';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useUser } from '../lib/hooks';
import cookie from 'js-cookie';


const LoginNav = () => {
  const [user, { mutate }] = useUser();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const handleLogout = async () => {
    try {
      let res = await fetch('/api/logout');
      mutate({ user: null });
      cookie.remove('user');
      if (res.status === 204) {
        router.push('/login');
      }
    } catch (err) {
      router.push('/login');
    }
  };

  const handleShowModal = () => {
    setShowModal(prev => !prev);
  };

  if (user) {
    return (
      <>
        <nav className={navStyles.nav}>
          <ul>
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
        {showModal && <ComposeModal body={<Post setShowModal={setShowModal}/>} handleShowModal={handleShowModal}/>}
      </>
    );
  } else {
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
          </ul>
        </nav>
      </>
    );
  }
};

export default LoginNav;