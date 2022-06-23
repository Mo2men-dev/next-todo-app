import React, { useEffect, useState } from "react";
import { MdOutlineDarkMode } from "react-icons/md";
import { BsSun } from "react-icons/bs";
import { useAuthContext } from "../context/AuthContext";
import { useRouter } from "next/router";
import { auth } from "../firebase/firebase";

function Nav() {
  // router is used to redirect to the user's profile page after signing out
  const rounter = useRouter();

  // state is used to toggle the dark mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  let htmlElement: HTMLHtmlElement | null;
  if (typeof window !== "undefined") {
    // get the html element
    htmlElement = document.querySelector("html");
  }
  // set the class name of the html element to dark on click and save it to local storage
  function changeTheme() {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      htmlElement?.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      htmlElement?.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }

  // useEffect is used to check the local storage and set the theme
  useEffect(() => {
    if (localStorage.getItem("theme") == "dark") {
      htmlElement?.classList.add("dark");
      setIsDarkMode(true);
    } else {
      htmlElement?.classList.remove("dark");
      setIsDarkMode(false);
    }
  }, []);

  // auth context is used to check if a user is logged in
  const currentUser = useAuthContext()?.currentUser;

  // signOut is used to sign out of the current user
  const signOut = useAuthContext()?.logout;

  const handleSignOut = async () => {
    signOut && signOut(auth);
    rounter.push("/");
  };

  return (
    // if a user is logged in, render the nav bar with the user's display name and sign out button

    <div className="flex justify-between fixed top-0 right-0 w-full">
      {currentUser ? (
        <div className="flex justify-center items-center m-2 whitespace-nowrap text-gray-300 dark:text-gray-300">
          <span className="text-white dark:text-blue-400">
            <a href={`/user/${currentUser?.displayName}`}>
              {currentUser?.displayName}
            </a>
          </span>
        </div>
      ) : null}
      <div className="w-full flex justify-end">
        <button
          type="button"
          onClick={changeTheme}
          className="h-fit text-white bg-indigo-800 hover:bg-indigo-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 m-1 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          {isDarkMode ? <BsSun /> : <MdOutlineDarkMode />}
        </button>

        {/* conditionly render the signout button when user is signed in */}
        {currentUser ? (
          <button
            type="button"
            onClick={handleSignOut}
            className="h-fit text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mx-1 my-auto dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            Sign out
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default Nav;
