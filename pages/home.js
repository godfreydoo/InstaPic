import React, { useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useUser } from '../lib/hooks';
import PropTypes from 'prop-types';


const Home = ({ data }) => {
  const router = useRouter();
  const [user, { mutate }] = useUser();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (data) {
    return (
      <div className="card-container">
        {data.map((value, index) => {
          return (
            <div className="card" key={value._id}>
              <Image src={value.url} width="450" height="450" alt={value.description}/>
              <article className="content" >
                <div className="user">{value.username}</div>
                <p>{value.description}</p>
              </article>
            </div>
          );
        })}
      </div>
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