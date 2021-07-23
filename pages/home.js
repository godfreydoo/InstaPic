import React, { useState, useEffect } from 'react';
import PaginationOutlined from '../components/Pagination';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useUser } from '../lib/hooks';
import { getPosts, getTotalPosts } from '../lib/db';
import PropTypes from 'prop-types';
import cookie from 'js-cookie';
import ta from 'time-ago';


const Home = ({ data, count }) => {
  const router = useRouter();
  const [user, { mutate }] = useUser();
  const [displayData, setDisplayData] = useState(data);
  const [userView, setUserView] = useState('');


  useEffect(() => {
    if (!user && !(cookie.get('user'))) {
      router.push('/login');
    }
  }, [user, router]);

  const filterPostsByUserOrPage = async (username = undefined, page) => {
    // per page count = 8 by default
    try {
      const res = await fetch(`/api/get?username=${username}&page=${page}&count=8`);
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
          <div className="top-level-navigation">
            <div>
              {userView && <u onClick={() => filterPostsByUserOrPage()}>View all posts</u>}
            </div>
            <div className="pagination">
              <PaginationOutlined filterPostsByUserOrPage={filterPostsByUserOrPage} count={count}/>
            </div>
          </div>
          <div className="card-container">
            {displayData.map((value, index) => {
              return (
                <div className="card" key={value._id}>
                  <div className="card-image-parent">
                    <Image src={value.url} width={450} height={450} className="card-image" alt={value.description}/>
                  </div>
                  <article className="content" >
                    <div className="user" onClick={() => filterPostsByUserOrPage(value.username)}>{value.username}</div>
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

export const getServerSideProps = async (context) => {
  const resPosts = await getPosts(undefined, 1, 8);
  const resCount = await getTotalPosts();

  const data = JSON.parse(JSON.stringify(resPosts));
  const count = JSON.parse(JSON.stringify(resCount));

  if (!data) {
    return {
      redirect: {
        destination: '/home',
        permanent: true,
      }
    };
  }

  return {
    props: { data, count }
  };
};

Home.propTypes = {
  data: PropTypes.array,
};

export default Home;