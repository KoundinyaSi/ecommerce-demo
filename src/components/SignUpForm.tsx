import React, { useState, useRef } from "react";
import bcrypt from "bcryptjs";

interface SignUpFormProps {
  onSignUpComplete: (status: boolean, email: string) => void;
}

const RegistrationForm: React.FC<SignUpFormProps> = ({ onSignUpComplete })  => {
  const [error, setError] = useState<string | null>(null);
  const [signUpStatus, setSignUpStatus] = useState<boolean | null>(true);

  const signUpFormRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const salt = await bcrypt.genSalt(10);
      const formData = new FormData(signUpFormRef.current);
      const name = formData.get("user-name")?.toString();
      const email = formData.get("email")?.toString();
      const password = await bcrypt.hash(
        formData.get("password")?.toString(),
        salt,
      );

      if (!name || !email || !password) {
        setError("All fields are required");
        window.alert("All fields are required.");
        return;
      }
      try {
        const newUser = { name, email, password: password };

        const usersData = JSON.parse(localStorage.getItem("users") || "[]");
        const existingUser = usersData.find(
          (user: any) => user.email === email,
        );
        if (existingUser) {
          setError("User with this email already exists");
          window.alert("User with this email already exists.");
          signUpFormRef.current?.reset();
          return;
        }

        usersData.push(newUser);
        localStorage.setItem("users", JSON.stringify(usersData));
        
        setSignUpStatus(true)
        console.log(email)
        console.log(signUpStatus)
        await onSignUpComplete(signUpStatus, email)

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
        ref={signUpFormRef}
        onSubmit={handleSubmit}
        className="align-center flex w-full flex-col justify-center self-center px-10"
      >
        {/* Labels and inputs for form data */}
        <label htmlFor="user-name" className="label">
          Name
        </label>
        <input
          className="input rounded-md"
          name="user-name"
          required
          type="text"
        />

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
          CREATE ACCOUNT
        </button>
      </form>
  );
};

export default RegistrationForm;
