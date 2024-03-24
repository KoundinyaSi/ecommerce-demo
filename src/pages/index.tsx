import React from 'react';
import LoginPage from './login';


const HomePage: React.FC = () => {
  return (
    <div className='flex flex-col'>
      <LoginPage />
    </div>
  );
};

export default HomePage;
