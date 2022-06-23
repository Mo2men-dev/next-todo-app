import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { auth } from "../firebase/firebase";
import ShowPasswordButton from "./ShowPasswordButton";

function SignupForm() {
  // router is used to redirect to the user's profile page
  const router = useRouter();

  // state is used to store the user's email and password and to display name
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  // password input ref
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRepeatRef = useRef<HTMLInputElement>(null);

  // authContext is used to create a new user
  const signup = useAuthContext()?.signup;

  // Regex Function to validate email
  const validateEmail = (email: String) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  // submit function is used to create a new user
  const handleSignup: React.MouseEventHandler<
    HTMLButtonElement | HTMLAnchorElement
  > = async (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      signup && (await signup(auth, email, password, displayName));
      router.push(`/`);
    }
  };
  return (
    // form is used to create a new user and is styled using tailwindcss

    <div className="w-full h-full flex flex-col items-center justify-center">
      {/* Sign up form */}
      <form className="bg-indigo-800 p-4 h-2/4 w-3/4 rounded-md dark:bg-gray-800">
        <label
          htmlFor="email"
          className="w-full text-center block mb-2 text-3xl font-['Helvetica'] text-gray-300 dark:text-gray-300"
        >
          Sign up with email or{" "}
          <a
            href="/"
            className="text-white border-b-2 border-blue-300 cursor-pointer hover:cursor-pointer dark:text-blue-300 dark:border-whites"
          >
            Sign in
          </a>{" "}
          instead
        </label>

        {/* E-mail input */}
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

        {/* diplay name input */}
        <div className="mb-6">
          <label
            htmlFor="displayName"
            className="block mb-2 text-sm font-medium text-gray-300 dark:text-gray-300"
          >
            Display Name
          </label>
          <input
            type="text"
            id="displayName"
            onChange={(e) => setDisplayName(e.target.value)}
            className="bg-gray-50 border shadow-xl border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Display Name (12 char)"
            required
          />
        </div>

        {/* password and rebeat input */}
        <div className="grid grid-flow-col space-x-2">
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

          <div className="mb-6 relative">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-300 dark:text-gray-300"
            >
              Repeat password
            </label>
            <input
              type="password"
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              className="bg-gray-50 border shadow-xl border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Repeat password"
              ref={passwordInputRepeatRef}
              required
            />
            {/* Show password button component*/}
            <ShowPasswordButton
              className="cursor-pointer text-blue-800 dark:text-blue-400"
              onClick={() => {
                if (passwordInputRepeatRef.current) {
                  passwordInputRepeatRef.current.type =
                    passwordInputRepeatRef.current.type === "password"
                      ? "text"
                      : "password";
                }
              }}
            />
          </div>
        </div>

        {/* Sign up button */}
        <div className="w-full flex flex-col items-center justify-between">
          <button
            disabled={
              password !== passwordConfirmation ||
              !email ||
              !password ||
              !passwordConfirmation ||
              !displayName ||
              displayName.length < 3 ||
              password.length > 12
            }
            type="submit"
            onClick={handleSignup}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none disabled:bg-slate-500 dark:disabled:bg-slate-500 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
