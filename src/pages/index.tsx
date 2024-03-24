import React from 'react';
import Header from '../components/Header';
import SignUpPage from './signUp';

const HomePage: React.FC = () => {
  return (
    <div className='flex flex-col'>
      <Header />
      <SignUpPage />
    </div>
  );
};

export default HomePage;
