import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/Layout';
import Head from 'next/head';
import '../styles/globals.css';

const MyApp = function ({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>InstaPic</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
};

MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
};

export default MyApp;