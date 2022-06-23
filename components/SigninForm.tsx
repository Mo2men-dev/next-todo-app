import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import ShowPasswordButton from "./ShowPasswordButton";

function SigninForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const validateEmail = (email: String) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <form className="bg-indigo-800 p-4 h-2/4 w-3/4 rounded-md dark:bg-gray-800">
        <label
          htmlFor="email"
          className="w-full text-center block mb-2 text-3xl font-['Helvetica'] text-gray-300 dark:text-gray-300"
        >
          Sign in with email or{" "}
          <a
            href="/signup"
            className="text-white border-b-2 border-blue-300 cursor-pointer hover:cursor-pointer dark:text-blue-300 dark:border-whites"
          >
            Sign up
          </a>
        </label>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-300 dark:text-gray-300"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-50 border shadow-xl border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="E-mail"
            required
          />
        </div>
        <div className="mb-6 relative">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-300 dark:text-gray-300"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-50 border shadow-xl border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Password"
            ref={passwordInputRef}
            required
          />
          {/* Show password button component*/}
          <ShowPasswordButton
            className="cursor-pointer text-blue-800 dark:text-blue-400"
            onClick={() => {
              if (passwordInputRef.current) {
                passwordInputRef.current.type =
                  passwordInputRef.current.type === "password"
                    ? "text"
                    : "password";
              }
            }}
          />
        </div>
        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
              required
            />
          </div>
          <label
            htmlFor="remember"
            className="ml-2 text-sm font-medium text-gray-300 dark:text-gray-300"
          >
            Remember me
          </label>
        </div>
        <div className="w-full flex flex-col items-center justify-between">
          <button
            disabled={!email || !password}
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:bg-slate-500 dark:disabled:bg-slate-500 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
}

export default SigninForm;