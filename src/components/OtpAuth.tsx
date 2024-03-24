import React, { useState, useRef } from "react";
import { useRouter } from "next/router";

const OtpAuth: React.FC = () => {
  const router = useRouter();
  const length = 8;
  const expectedOtp = "12345678"; // Expected OTP value
  const [otpValues, setOtpValues] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(length).fill(null));
  const [error, setError] = useState<string | null>(null);

  const handleChange = (index: number, value: string) => {
    const updatedOtpValues = [...otpValues];
    updatedOtpValues[index] = value;
    setOtpValues(updatedOtpValues);
    setError(null); // Clear error message when input changes

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    const { key } = event;
    const isValidKey = /^[0-9]$/i.test(key);

    if (!isValidKey && key !== 'Backspace' && key !== 'Delete') {
      event.preventDefault();
    }

    if ((key === 'Backspace' || key === 'Delete') && index > 0 && !event.currentTarget.value) {
      const updatedOtpValues = [...otpValues];
      updatedOtpValues[index] = '';
      setOtpValues(updatedOtpValues);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const enteredOtp = otpValues.join('');
    if (enteredOtp === expectedOtp) {
      router.push("/categories")
      console.log('OTP is correct');
      setError(null);
    } else {

      setError('Incorrect OTP. Please try again.');
    //   alert('Incorrect OTP. Please try again.')
    }
  };

  return (
    <div className="align-center justify-center place-self-center px-2 py-3">
      <form onSubmit={handleVerify} className="align-center flex w-full flex-col justify-center self-center">
        <label htmlFor="password" className="label mt-6">
          Code
        </label>
        <div className="flex w-full flex-row items-center justify-evenly">
        {otpValues.map((value, index) => (
            <div className="mr-4 h-12 w-full" key={index}>
              <input
                className="border-gray-200 bg-white focus:bg-gray-50 ring-blue-700 flex h-full w-full flex-col items-center justify-center rounded-xl border px-2 text-center text-lg outline-none focus:ring-1"
                type="text"
                maxLength={1}
                value={value}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyPress(e, index)}
                ref={(el) => (inputRefs.current[index] = el)}
              />
            </div>
          ))}
        </div>
        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          className="bg-black text-white text-m mt-10 w-full rounded-md py-4 text-xs"
        >
          VERIFY
        </button>
      </form>
    </div>
  );
};

export default OtpAuth;
