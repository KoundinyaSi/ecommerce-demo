import Link from "next/link";
import React, { useState, useEffect } from "react";
import OtpAuth from "~/components/OtpAuth";
import RegistrationForm from "~/components/SignUpForm";

const SignUpPage: React.FC = () => {
  const [signupStatus, setSignupStatus] = useState<boolean>();
  const [userEmail, setUserEmail] = useState<string>("");
  const [otpSuccess, setOtpSuccess] = useState<boolean>();
  const [userName, setUserName] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");


  const handleSignupStatusChange = (
    status: boolean,
    email: string,
    name: string,
    password: string,
  ) => {
    console.log("Signup form parent signup:",status);
    setSignupStatus(status);
    setUserEmail(email);
    setUserName(name);
    setUserPassword(password);
  };

  const handleOtpSuccessChange = (otpStatus: boolean) => {
    console.log("OTP from signUp:",otpStatus);
    setOtpSuccess(otpStatus);
  };

  useEffect(() => {
    if (signupStatus == true && otpSuccess==true) {
      const authStatus = {status: true,email: userEmail}
      localStorage.setItem("authStatus",JSON.stringify(authStatus))
      const usersData = JSON.parse(localStorage.getItem("users") || "[]");
      console.log(usersData);
      const currentUser = {
        name: userName,
        email: userEmail,
        password: userPassword,
        signedIn: true,
      };
      usersData.push(currentUser);
      usersData.forEach(user => {
        if(user.name!=currentUser.name){
          return user.signedIn = false
        }
      });
      console.log(usersData);
      localStorage.setItem("users", JSON.stringify(usersData));
    }
  }, [signupStatus, otpSuccess]);

  return (
    <div className="align-center border-dark-grey my-2 w-1/3 justify-center place-self-center rounded-xl border px-10 py-8">
      {signupStatus ? (
        <div className="w-full">
          <h1 className="my-4 text-center text-3xl font-bold font-semibold">
            Verify your email
          </h1>
          <p className="px-5 text-center text-sm">
            Enter the 8 digit code you have received on
            {userEmail}
          </p>
          <OtpAuth onOtpSuccess={handleOtpSuccessChange} />
        </div>
      ) : (
        <div>
          <h1 className="my-6 text-center text-3xl font-bold font-semibold">
            Create your account
          </h1>
          <RegistrationForm onSignUpComplete={handleSignupStatusChange} />
          <h1 className="my-10 w-full text-center">
            Have an account?{" "}
            <Link className="font-semibold" href="/">
              LOGIN
            </Link>
          </h1>
        </div>
      )}
    </div>
  );
};

export default SignUpPage;
