// pages/login.tsx
import React from 'react';
import Header from '../components/Header';
import LoginForm from '../components/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-4">Login</h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
