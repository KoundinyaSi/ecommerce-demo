import React, { useState, useRef } from "react";
import bcrypt from "bcryptjs";

interface loginProps {
  onLoginComplete: (status: boolean, email: string) => void;
}

const LoginForm: React.FC<loginProps> = ({ onLoginComplete })  => {
  const [error, setError] = useState<string | null>(null);
  const [loginStatus, setLoginStatus] = useState<boolean | null>(false);

  const loginFormRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(loginFormRef.current);
      const email = formData.get("email")?.toString();
      const password = formData.get("password")?.toString();

      if (!email || !password) {
        setError("All fields are required");
        window.alert("All fields are required.");
        return;
      }
      try {
        const newUser = { email, password: password };

        const usersData = JSON.parse(localStorage.getItem("users") || "[]");
        const existingUser = usersData.find(
          (user: any) => user.email === email,
        );
        if (existingUser) {
          const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
          if(isPasswordCorrect){
            console.log("Details are correct!")
            setLoginStatus(true)
            return;
          }
          else{
            setError("Password incorrect");
          window.alert("Password incorrect");
          return;
          }
        }
        else{
          setError("User is not registered. Please Sign-up before logging in.")
          window.alert("User is not registered. Please Sign-up before logging in.")
        }
        usersData.push(newUser);
        localStorage.setItem("users", JSON.stringify(usersData));
        
        setLoginStatus(true)
        console.log(email)
        console.log(loginStatus)
        await onLoginComplete(loginStatus, email)

        console.log("User signed up successfully:", newUser);
        } catch (error) {
        console.error("Error signing up:", error);
      }
    } catch (error) {
      console.error("Registration error:", error);
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
        <input
          className="input rounded-md"
          name="email"
          required
          type="email"
        />

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
