import React, { useEffect } from 'react';
import { useUser } from '../lib/hooks';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();
  const [user, { loading }] = useUser();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading]);

  return (
    <div>
      Home page
    </div>
  );
};

export default Home;
