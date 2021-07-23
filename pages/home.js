import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useUser } from '../lib/hooks';
import PropTypes from 'prop-types';
import ta from 'time-ago';


const Home = ({ data }) => {
  const router = useRouter();
  const [user, { mutate }] = useUser();
  const [displayData, setDisplayData] = useState(data);
  const [userView, setUserView] = useState('');


  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  const filterPostsByUser = async (username) => {
    try {
      const res = await fetch(`http://localhost:3000/api/get?username=${username}`);
      const data = await res.json();
      setDisplayData(data);
      setUserView(username);
    } catch (err) {
      window.alert('Something went wrong. Please try again.');
    }
  };

  if (data) {
    return (
      <>
        <div>
          {userView && <u onClick={() => filterPostsByUser()}>View all posts</u>}
          <div className="card-container">
            {displayData.map((value, index) => {
              return (
                <div className="card" key={value._id}>
                  <Image src={value.url} width="450" height="450" alt={value.description}/>
                  <article className="content" >
                    <div className="user" onClick={() => filterPostsByUser(value.username)}>{value.username}</div>
                    <div>{ta.ago(value.dateCreated)}</div>
                  </article>
                  <p>{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  } else {
    return null;
  }

};

export const getStaticProps = async (context) => {
  const res = await fetch('http://localhost:3000/api/get');
  const data = await res.json();

  if (!data) {
    return {
      redirect: {
        destination: '/home',
        permanent: false,
      }
    };
  }

  return {
    props: { data }
  };
};

Home.propTypes = {
  data: PropTypes.array,
};

export default Home;