import React, { useState } from 'react';
// import { api } from '../api/trpc';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Make API call for user login
      const user = await api.user.login({ email, password });
      console.log('Logged in user:', user);
      // Redirect or handle login success
    } catch (error) {
      console.error('Login error:', error);
      // Handle login error (display error message, etc.)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      {/* Login form fields */}
    </form>
  );
};

export default LoginForm;
