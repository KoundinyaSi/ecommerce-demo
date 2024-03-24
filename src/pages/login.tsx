import React from "react";
import LoginForm from "../components/LoginForm";

const LoginPage: React.FC = () => {
  return (
    <div className="container mx-auto mt-8">
      <h1 className="mb-4 text-3xl font-bold">Login</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
