// pages/signup.tsx
import Link from "next/link";
import React, { useState } from "react";
import OtpAuth from "~/components/OtpAuth";
import RegistrationForm from "~/components/SignUpForm";

const SignUpPage: React.FC = () => {
  const [signupStatus, setSignupStatus] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>('');

  const handleSignupStatusChange = async(status: boolean, email: string) => {
    console.log(status)
    await setSignupStatus(status);
    await setUserEmail(email);
  };

  return (
    <div className="align-center border-dark-grey my-2 w-1/3 justify-center place-self-center rounded-xl border px-10 py-8">
      {signupStatus ? (
        <div className="w-full">
        <h1 className="my-4 text-center text-3xl font-bold font-semibold">
        Verify your email
      </h1>
      <p className="text-center text-sm px-5">
      Enter the 8 digit code you have received on 
      {userEmail}
      </p>
        <OtpAuth />
        </div>
      ):(
        <div>
      <h1 className="my-6 text-center text-3xl font-bold font-semibold">
        Create your account
      </h1>
      <RegistrationForm onSignUpComplete = {handleSignupStatusChange}/>
      <h1 className="my-10 w-full text-center">
        Have an account?{" "}
        <Link className="font-semibold" href="/">
          LOGIN
        </Link>
      </h1>
    </div>)}
    </div>
  );
};

export default SignUpPage;
