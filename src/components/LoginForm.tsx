import React, { useState, useRef } from "react";
import bcrypt from "bcryptjs";
import { useRouter } from "next/router";

const LoginForm: React.FC= () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loginStatus, setLoginStatus] = useState<boolean | null>(false);

  const loginFormRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData= new FormData(loginFormRef.current!);
      const email = formData.get("email")?.toString();

        const usersData = JSON.parse(localStorage.getItem("users") ?? "[]");
       
        const existingUser = usersData.find(
          (user: { name:string,email:string,password: string, interests:[]; signedIn: boolean; }) => user.email === email,
        );
        if (existingUser) {
          const isPasswordCorrect = await bcrypt.compare(
            formData.get("password")?.toString()!,
            existingUser.password,
          );
          if (isPasswordCorrect) {
            usersData.forEach((user: {name: string, password: string, email: string ,signedIn: boolean, interests: [] }) => {
              if(user.email!=email){
                return user.signedIn = false;
              }
              else{
                return user.signedIn = true;
              }
          });
          localStorage.setItem("users", JSON.stringify(usersData))
            setLoginStatus(true);
            console.log(loginStatus)
            const authStatus = {status: true,email: email}
            localStorage.setItem("authStatus",JSON.stringify(authStatus))
            // onLoginComplete(loginStatus, email);
            router.push("/categories");
            return;
          } else {
            setError("Password incorrect");
            window.alert("Password incorrect");
            return;
          }
        } else {
          setError("User is not registered. Please Sign-up before logging in.");
          console.log(error)
          window.alert(
            "User is not registered. Please Sign-up before logging in.",
          );
        }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <form
      ref={loginFormRef}
      onSubmit={handleSubmit}
      className="align-center flex w-full flex-col justify-center self-center px-10"
    >
      <label htmlFor="email" className="label mt-6">
        Email
      </label>
      <input className="input rounded-md" name="email" required type="email" />

      <label htmlFor="password" className="label mt-6">
        Password
      </label>
      <input
        className="input rounded-md"
        name="password"
        required
        type="password"
      />

      <button
        type="submit"
        className="bg-black text-white mt-6 w-full rounded-md py-4 text-xs"
        // onSubmit={handleSubmit}
      >
        LOGIN
      </button>
    </form>
  );
};

export default LoginForm;
