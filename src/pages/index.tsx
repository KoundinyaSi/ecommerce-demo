import Link from "next/link";
import React, { useState } from "react";
import LoginForm from "~/components/LoginForm";

const LoginPage: React.FC = () => {
  return (
    <div className="align-center border-dark-grey my-2 w-1/3 justify-center place-self-center rounded-xl border px-10 py-8">
      <div>
      <h1 className="mt-6 text-center text-3xl font-bold">
        Login
      </h1>
      <h3 className="mt-3 text-center text-xl font-extra-semibold">Welcome back to ECOMMERCE</h3>
      <p className="mt-3 text-center">The next gen business marketplace</p>
      </div>
      <LoginForm />
      <h1 className="my-10 w-full text-center">
        Don't have an account?{" "} 
        <Link className="font-semibold" href="/signup">
          SIGN UP
        </Link>
      </h1>
    </div>
  );
};

export default LoginPage;
