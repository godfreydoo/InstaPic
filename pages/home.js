import React from 'react';
import axios from 'axios';
import Image from 'next/image';
import PropTypes from 'prop-types';


const Home = ({ data }) => {
  return (
    <div className="card-container">
      {data.map((value, index) => {
        return (
          <div className="card" key="index">
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
};

export const getStaticProps = async () => {
  const res = await fetch('http://localhost:3000/api/get');
  const data = await res.json();

  return {
    props: { data }
  };
};

Home.propTypes = {
  data: PropTypes.array,
};

export default Home;