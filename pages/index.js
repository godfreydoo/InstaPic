import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/login');
  });

  return (
    <div>
      Hello
    </div>
  );
};

export default Index;